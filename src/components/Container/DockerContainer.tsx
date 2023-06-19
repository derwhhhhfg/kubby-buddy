import React, { FC, useContext, useEffect } from 'react';
import './Container.scss';
import { UserContext } from '../../UserContext';
import { DisplayRunning } from './ContainerDisplay';

export const DockerContainers: FC = () => {
  const { setRunningContainers, setStatStream } = useContext(UserContext);

  useEffect(() => {
    async function getRunningContainers() {
      try {
        const url = 'container/all-active-containers';
        const response = await fetch(url);
        const data = await response.json();
        setRunningContainers(data);
      } catch (err) {
        console.error(err);
      }
    }
    getRunningContainers();
  }, []);

  //Create EvenSource to stream docker stats

  useEffect(() => {
    console.log('in use effect');
    const sse = new EventSource('http://localhost:8080/general/stats');
    console.log(sse);
    sse.onmessage = (event: MessageEvent) => {
      console.log('in onmessage');
      const data = JSON.parse(event?.data);
      setStatStream(data);
    };
    //If there is an error for the stream (Docker not running / No active containers) - setup for Error Component

    //if this is uncommented, the stream stops

    // sse.onerror = () => {
    //   return sse.close();
    // }
    //Cleanup
    return () => {
      sse.close();
    };
  }, []);

  //pass down necessary props to buttons for their relevant fetch requests
  return <DisplayRunning />;
};
