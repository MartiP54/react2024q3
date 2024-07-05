import React from 'react';

interface Location {
  uid: string;
  name: string;
}

interface AstronomicalObject {
  uid: string;
  name: string;
  astronomicalObjectType: string;
  location: Location | null;
}

interface AstronomicalObjectsProps {
  query: string;
}

interface AstronomicalObjectsState {
  data: AstronomicalObject[];
  loading: boolean;
  error: string | null;
}

export default class AstronomicalObjects extends React.Component<AstronomicalObjectsProps, AstronomicalObjectsState> {
  constructor(props: AstronomicalObjectsProps) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const { query } = this.props;
    this.fetchData(query);
  }

  componentDidUpdate(prevProps: AstronomicalObjectsProps) {
    const { query } = this.props;
    if (query !== prevProps.query) {
      this.setState({ data: [], loading: true, error: null });
      this.fetchData(query);
    }
  }

  fetchData = async (query: string) => {
    try {
      const response = await fetch('http://stapi.co/api/v2/rest/astronomicalObject/search', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `name=${query}`
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      this.setState({ data: result.astronomicalObjects, loading: false });
    } catch (error) {
      this.setState({ error: (error as Error).message, loading: false });
    }
  };

  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return <div>Loading Astronomical Objects...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        <h1>Astronomical Objects</h1>
        <div className="astronomical-objects-list">
          {data.length === 0 ? (
            <p>No results found</p>
          ) : (
            data.map((obj) => (
              <div key={obj.uid} className="astronomical-object">
                <h2>{obj.name}</h2>
                <p>Type: {obj.astronomicalObjectType}</p>
                <p>Location: {obj.location ? obj.location.name : 'Unknown'}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}