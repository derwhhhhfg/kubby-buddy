import React, { useContext } from 'react';
import stop from '../../assets/stop.png';

import { CommandButtonProps } from '../../types';
import { UserContext } from '../../UserContext';
// import { StoppedContainers } from '../Container/StoppedContainers';

interface StopCommandProps extends CommandButtonProps {
  // onClick: ()=> void;
}

const StopButton: React.FC<StopCommandProps> = ({
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
      console.log('----', data);
      console.log(cmdRoute, 'this is the route');
      console.log(runningContainers[0]);

      setStoppedContainers([
        ...stoppedContainers,
        ...runningContainers.filter((container) => container.Names === name),
      ]);
      setRunningContainers(
        runningContainers.filter((container) => container.Names !== name)
      );
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <button
      className="stop"
      style={{ backgroundImage: `url(${stop})` }}
      onClick={command}
    ></button>
  );
};

export const StopCommands: React.FC<StopCommandProps> = ({
  name,
  cmdRoute,
  fetchMethod,
}) => {
  return (
    <div className="stopCommand-container">
      <StopButton name={name} cmdRoute={cmdRoute} fetchMethod={fetchMethod} />
    </div>
  );
};

// export const StopButton: React.FC = () => {
//   //helper
//   const handleStop = async () => {
//     try {
//       const response = await fetch("/container/log", {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: `container-name` }),
//       });
//       const data = await response.json();
//       console.log(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <button
//       style={{ backgroundImage: `url(${stop})` }}
//       onClick={handleStop}
//     ></button>
//   );
// };
