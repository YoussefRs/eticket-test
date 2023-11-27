import { React, useState } from "react";
import "./Accordian.css";

const Accordian = ({ data }) => {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };

  if (!data) {
    return;
  }

  return (
    <>
      <div className="outerfaq">
        <div className="firstrow">
          <div className="seperator">
            <div id="lineaboutus1FAQ"></div>
            <div id="lineaboutus2FAQ"></div>
          </div>
          <div className="wrapper">
            <div className="accordion">
              {data.map((item, i) => (
                <div className="item" key={i}>
                  <div className="ac_title" onClick={() => toggle(i)}>
                    <h2 className="faq_question">{item.question}</h2>
                    <span>
                      {selected === i ? (
                        <svg
                          width="16"
                          height="4"
                          viewBox="0 0 16 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.803711"
                            y="0.110458"
                            width="14.9902"
                            height="3.12296"
                            rx="1.56148"
                            fill="#444790"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="6.7373"
                            y="15.1671"
                            width="14.9902"
                            height="3.12296"
                            rx="1.56148"
                            transform="rotate(-90 6.7373 15.1671)"
                            fill="#444790"
                          />
                          <rect
                            x="0.803711"
                            y="6.11046"
                            width="14.9902"
                            height="3.12296"
                            rx="1.56148"
                            fill="#444790"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                  <div
                    className={selected === i ? "contentt show" : "contentt"}
                  >
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordian;
