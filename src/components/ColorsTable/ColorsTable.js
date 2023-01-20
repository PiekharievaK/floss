import { useSelector } from "react-redux";
import s from "./ColorsTable.module.scss";

export const ColorsTable = ({ data, selectedLabels }) => {
  const isDark = useSelector((state) => state.theme.isDark);

  
  return (
    <div className={isDark? s.boxDark:s.box  }>
      <table className={s.table}>
        <tbody>
        <tr height="20" aria-label="height:15.0pt">
        <td className={s.tableTitle}> Сolor</td>
            {selectedLabels.includes("DMC")&&<td className={s.tableTitle}> DMC</td>}
            {selectedLabels.includes("Anchor")&&<td className={s.tableTitle}> Anchor</td>}
            {selectedLabels.includes("Madeira")&&<td className={s.tableTitle}> Madeira</td>}
            {selectedLabels.includes("Gamma")&&<td className={s.tableTitle}> Gamma</td>}
          <td className={s.tableTitle}> Color name</td>
          <td className={s.hide + " " + s.tableTitle}> Название цвета</td>
        </tr>
        { data.map( color =>{ return <tr height="20" aria-label="height:15.0pt" key={color.dmcNumber}>
        <td style={{backgroundColor: color.hex}} className={s.hash}></td>
        {selectedLabels.includes("DMC")&&<td> {color.labels.DMC}</td>}
        {selectedLabels.includes("Anchor")&&  <td> {color.labels.Anchor}</td>}
        {selectedLabels.includes("Madeira")&&  <td> {color.labels.Madeira}</td>}
        {selectedLabels.includes("Gamma")&&   <td> {color.labels.Gamma}</td>}
          <td>{color.colorName}</td>
                  <td className={s.hide} >{color.colorRUname}</td>
        </tr>})}
        </tbody>
      </table>
    </div>
  );
};
{/* <table>
  <tbody id="colors">
    <tr>
      <td>
        <div>
          <strong>&nbsp;&nbsp; Color &nbsp;&nbsp;</strong>
        </div>
      </td>
      <td>
        <div>
          <strong>Number</strong>
        </div>
      </td>
      <td>
        <div>
          <strong>Color name</strong>
        </div>
      </td>
      <td>
        <div>
          <strong className={s.hide}>Название цвета</strong>
        </div>
      </td>
    </tr>
    {data.map((el) => {
      return (
        <tr key={el.number}>
          <td bgcolor={el.hex} className={s.hash}>{/* {el.hex} </td>*/}
//           <td>{el.number}</td>
//           <td>{el.colorName}</td>
//           <td className={s.hide}>{el.colorRUname}</td>
//         </tr>
//       );
//     })}
//   </tbody>
// </table> */}


