const Steps = ({ item, currentStep }) => {
  const length = item.length;

  return (
    <ul className="steps w-full">
      {item.map((item, index) => (
        <li
          key={index}
          className={index + 1 <= currentStep ? "step step-primary" : "step"}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default Steps;
