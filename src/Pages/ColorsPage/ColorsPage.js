import { colors } from "./colors";

export const ColorsPage = () => {
  const colorsTable = () => {
    const table = document.getElementById("colors");
    const arr = [...table.rows];
    const data = arr.map((tr) => {
      const row = tr.querySelectorAll("td");
      console.log({ ...row[0] });

      return {
        hex: { ...row[0] }.__reactProps$oqdg78o7lv?.bgcolor
          ? { ...row[0] }.__reactProps$oqdg78o7lv.bgcolor
          : "00",
        dmcNumber: { ...row[1] }.__reactProps$oqdg78o7lv?.children
          ? { ...row[1] }.__reactProps$oqdg78o7lv.children
          : "00",
        colorName: { ...row[2] }.__reactProps$oqdg78o7lv?.children
          ? { ...row[2] }.__reactProps$oqdg78o7lv.children
          : "00",
        colorRUname: { ...row[3] }.__reactProps$oqdg78o7lv?.children
          ? { ...row[3] }.__reactProps$oqdg78o7lv.children
          : "00",
      };
    });
    return data;
  };

  const createTable = (data) => {
    return (
      <table>
        <tbody id="colors">
          <tr>
            <td>
              <div>
                <strong>&nbsp;&nbsp; Цвет &nbsp;&nbsp;</strong>
              </div>
            </td>
            <td>
              <div>
                <strong>DMC</strong>
              </div>
            </td>
            <td>
              <div>
                <strong>Color</strong>
              </div>
            </td>
            <td>
              <div>
                <strong>Название цвета</strong>
              </div>
            </td>
          </tr>
          {data.map((el) => {
            return (
              <tr>
                <td bgcolor={el.hex}>{el.hex}</td>
                <td>{el.dmcNumber}</td>
                <td>{el.colorName}</td>
                <td>{el.colorRUname}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <div>
        <h1>ColorsPage</h1>
        {/* <button
          onClick={() => {
            console.log(colorsTable());
          }}
          style={{ width: "50px", height: "50px" }}
        >
          CLICK
        </button> */}
        {createTable(colors)}
      </div>
    </>
  );
};
