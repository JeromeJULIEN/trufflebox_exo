import { useState } from "react";
import { useRef, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Contract({ value }) {
  const spanEle = useRef(null);
  const [EventValue, setEventValue] = useState("");
  const [oldEvents, setOldEvents] = useState();

  const {state:{contract}} = useEth();

  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };

  }, [value]);

  useEffect(() => {
    (async function () {
 
       let oldEvents= await contract.getPastEvents('greetingChange', {
          fromBlock: 0,
          toBlock: 'latest'
        });
        let oldies=[];
        oldEvents.forEach(event => {
            oldies.push(event.returnValues._greet);
        });
        setOldEvents(oldies);
 
        await contract.events.greetingChange({fromBlock:"earliest"})
        .on('data', event => {
          let lesevents = event.returnValues._greet;
          setEventValue(lesevents);
        })          
        .on('changed', changed => console.log(changed))
        .on('error', err => console.log(err))
        .on('connected', str => console.log(str))
    })();
  }, [contract])

  return (
    <code>
      {`contract Greeting {
    string greeting = `}

      <span className="secondary-color" ref={spanEle}>
        <strong>{value}</strong>
      </span>

      {`;

    function read() public view returns (string memory) {
      return greeting;
    }

    function write(string memory newGreeting) public {
      greeting = newGreeting;
    }
    }
    
    New event:`} {EventValue} {`
    Old events:`} {oldEvents}
    </code>
  );
}

export default Contract;
