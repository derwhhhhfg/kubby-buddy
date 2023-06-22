import React, { useContext } from 'react';
import start from '../../assets/play.png';

import { CommandButtonProps } from '../../types';
import { UserContext } from '../../UserContext';

interface StartCommandProp extends CommandButtonProps {
  onClick: () => void;
}

const StartButton: React.FC<StartCommandProp> = ({
  name,
  cmdRoute,
  fetchMethod,
}) => {
  const {
    setStoppedContainers,
    setRunningContainers,
    stoppedContainers,
    runningContainers,
  } = useContext(UserContext);
  //helper
  const command = async () => {
    try {
      const URL = cmdRoute;
      const response = await fetch(URL, {
        method: fetchMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name }),
      });
      const data = await response.json();
      console.log(data, '***data in handleStart ');

      const containerToStart = stoppedContainers.find(
        (container) => container.Names === name
      );

      if (containerToStart) {
        setStoppedContainers(
          stoppedContainers.filter((container) => container.Names !== name)
        );
        setRunningContainers([...runningContainers, containerToStart]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      className="start"
      style={{ backgroundImage: `url(${start})` }}
      onClick={command}
    ></button>
  );
};

export const StartCommands: React.FC<StartCommandProp> = ({
  name,
  cmdRoute,
  fetchMethod,
  onClick,
}) => {
  return (
    <div className="startCommand-container">
      <StartButton
        name={name}
        cmdRoute={cmdRoute}
        fetchMethod={fetchMethod}
        onClick={onClick}
      />
    </div>
  );
};
