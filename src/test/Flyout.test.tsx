
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { vi, beforeEach, describe, it, expect } from 'vitest';
import Flyout from '../components/Flyout';
import { RootState } from '../store';
import { clearSelectedObjects } from '../slice/selectedObjectsSlice';

const mockStore = configureMockStore<RootState>();

describe('Flyout', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      selectedObjects: {
        selectedObjects: [
          {
            uid: '1',
            name: 'Object 1',
            astronomicalObjectType: 'Type 1',
            location: { uid: 'loc1', name: 'Location 1' },
          },
          {
            uid: '2',
            name: 'Object 2',
            astronomicalObjectType: 'Type 2',
            location: { uid: 'loc2', name: 'Location 2' },
          },
        ],
      },
      selectedObject: {
        selectedObject: null,
      },
      astronomicalObjects: {
        data: null,
      },
      pagination: {
        currentPage: 1,
      },
      search: {
        query: '',
      },
      astronomicalObjectsApi: {
        queries: {},
        mutations: {},
        provided: {},
        subscriptions: {},
        config: {
          reducerPath: 'astronomicalObjectsApi',
          online: true,
          focused: true,
          middlewareRegistered: true,
          refetchOnMountOrArgChange: true,
          refetchOnReconnect: true,
          refetchOnFocus: true,
          keepUnusedDataFor: 60,
          invalidationBehavior: 'delayed',
        },
      },
    });

    store.dispatch = vi.fn();
  });

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText('2 items are selected')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Unselect all' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument();
  });

  it('dispatches clearSelectedObjects action on Unselect all button click', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Unselect all' }));
    expect(store.dispatch).toHaveBeenCalledWith(clearSelectedObjects());
  });

  it('creates and clicks download link on Download button click', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const createElementSpy = vi.spyOn(document, 'createElement');
    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    const removeChildSpy = vi.spyOn(document.body, 'removeChild');

    if (!URL.createObjectURL) {
      URL.createObjectURL = vi.fn(() => 'mock-url');
    }
    if (!URL.revokeObjectURL) {
      URL.revokeObjectURL = vi.fn();
    }

    const createObjectURLMock = vi.spyOn(URL, 'createObjectURL').mockImplementation(() => 'mock-url');
    const revokeObjectURLMock = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    fireEvent.click(screen.getByRole('button', { name: 'Download' }));

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalled();

    createObjectURLMock.mockRestore();
    revokeObjectURLMock.mockRestore();
  });
});
