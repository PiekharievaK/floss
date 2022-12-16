import s from "./ColorsTable.module.scss"

export const ColorsTable = ({data}) =>{
    return <div className={s.box}><table>
    <tbody id="colors">
      <tr>
        <td>
          <div>
            <strong>&nbsp;&nbsp; Color &nbsp;&nbsp;</strong>
          </div>
        </td>
        <td>
          <div>
            <strong>DMC</strong>
          </div>
        </td>
        <td>
          <div>
            <strong>Color name</strong>
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
          <tr key={el.number}>
            <td bgcolor={el.hex}>{el.hex}</td>
            <td>{el.number}</td>
            <td>{el.colorName}</td>
            <td>{el.colorRUname}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
  </div>
}