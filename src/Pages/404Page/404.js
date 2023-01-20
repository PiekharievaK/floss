import Section from "../../components/Section";
import Container from "../../components/Container";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Container>
      <Section
        style={{
          display: "flex",
          flexDirection: "column",
          textAline: "center",
        }}
      >
        <h2>404 Page NotFound</h2>
        <h3>
          Go to
          <Link
            to="/"
            style={{
              color: "inherit",
              textDecoration: "none",
              borderBottom: "1px solid black",
            }}
          >
            HomePage
          </Link>
        </h3>
      </Section>
    </Container>
  );
};

// const reactId = "__reactProps$y4mww24p8vo";

// const colorsTable = () => {
//   const newFlosses = [];
//   const table = document.getElementById("colorsTable");
//   const arr = [...table.rows];
//   console.log(arr);
//   const data = arr.map((tr) => {
//     const row = tr.querySelectorAll("td");
//     console.log(row[0][reactId].children);
//     newFlosses.push({
//       DMC: row[0][reactId]?.children,
//       BELKA: row[1][reactId]?.children,
//       Kirova: row[2][reactId]?.children,
//       Bestex: row[3][reactId]?.children,
//       Gamma: row[4][reactId]?.children,
//       Anchor: row[5][reactId]?.children,
//       Madeira: row[6][reactId]?.children,
//     });

//     return {
//       // hex: { ...row[0] }.__reactProps$oqdg78o7lv?.bgcolor
//       //   ? { ...row[0] }.__reactProps$oqdg78o7lv.bgcolor
//       //   : "00",
//       // dmcNumber: { ...row[1] }.__reactProps$oqdg78o7lv?.children
//       //   ? { ...row[1] }.__reactProps$oqdg78o7lv.children
//       //   : "00",
//       // colorName: { ...row[2] }.__reactProps$oqdg78o7lv?.children
//       //   ? { ...row[2] }.__reactProps$oqdg78o7lv.children
//       //   : "00",
//       // colorRUname: { ...row[3] }.__reactProps$oqdg78o7lv?.children
//       //   ? { ...row[3] }.__reactProps$oqdg78o7lv.children
//       //   : "00",
//     };
//   });

//   return data;
// };

//   const newFile = () => {
//     console.log(colors);
//     console.log(links);

//     const list = colors.map((color) => {
//       //  const selectColor= links.find( link => link.DMC.toLocaleLowerCase()===color.colorName.toLocaleLowerCase() )
//       // const newColorObj = {...selectColor, labels: {...link}}
//       const selectColor = links.find((link) =>
//           link.DMC.toLowerCase() === color.number.toLowerCase()
//         )

//         if(selectColor) {

//                       const Obj = { ...color, labels: { ...selectColor} }
//                     return Obj
//                   } else{

//         const Obj = {...color, labels: {
//           DMC: color.number,
//           BELKA: "-",
//           Kirova: "-",
//           Bestex: "-",
//           Gamma: "-",
//           Anchor: "-",
//           Madeira: "-"
//       }}
//       return Obj
//     }
// }
// )
// console.log(list);
// }
