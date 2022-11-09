import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue }) {
  const { state: { contract, accounts } } = useEth();
  const [greetingValue, setGreetingValue] = useState("");

  const handleInputChange = e => {
    // if (/^\d+$|^$/.test(e.target.value)) //! ligne servant à limiter la saisie à des chiffres. Explication : https://stackoverflow.com/questions/14017134/what-is-d-d-in-regex
    // {
      setGreetingValue(e.target.value);
    // }
  };

  const read = async () => {
    const greeting = await contract.methods.read().call({ from: accounts[0] });
    setValue(greeting);
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (greetingValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = greetingValue;
    await contract.methods.write(newValue).send({ from: accounts[0] });
  };

  return (
    <div className="btns">

      <button onClick={read}>
        read()
      </button>

      <div onClick={write} className="input-btn">
        write(<input
          type="text"
          placeholder="greeting"
          value={greetingValue}
          onChange={handleInputChange}
        />)
      </div>

    </div>
  );
}

export default ContractBtns;
