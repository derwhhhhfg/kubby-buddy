import React, { FC, useContext, useEffect } from 'react';
import './Container.scss';
import { UserContext } from '../../UserContext';
import { DisplayRunning } from './ContainerDisplay';
import { StoppedContainers } from './StoppedContainers';
// import { Container } from '../../types';

export const DockerContainers: FC = () => {
  const { setStatStream } = useContext(UserContext);

  //Create EvenSource to stream docker stats

  useEffect(() => {
    // ** Change localhost to env later on **
    const sse = new EventSource('http://localhost:8080/general/stats');
    // console.log(sse);
    sse.onmessage = async (event: MessageEvent) => {
      const data = JSON.parse(event?.data);
      // const data = await event?.data.json()
      setStatStream(data);
    };
    //If there is an error for the stream (Docker not running / No active containers) - setup for Error Component

    //if this is uncommented, the stream stops

    sse.onerror = (event) => {
      // return sse.close();
      console.log('ERROR TRIPPED', event);
      console.log('Error message:', event.target);
    };
    //Cleanup
    return () => {
      sse.close();
    };
  }, []);

  //pass down necessary props to buttons for their relevant fetch requests
  return (
    <>
      <DisplayRunning />
      <StoppedContainers />
    </>
  );
};
