import { colors } from "./colors";
import { useState } from "react";
import { searchFilter } from "../../helpers/searchFilter";
import { ColorsTable } from "../../components/ColorsTable/ColorsTable";
import Container from "../../components/Container"
import Section from "../../components/Section"
import s from "./ColorsPage.module.scss"

export const ColorsPage = () => {
  const [filteredFloss, setFilteredFloss] = useState(colors);

  // useEffect(()=>{
  // пока список не из базы а из документа
  //   fetchAllFloss
  // }, [filteredFloss])

  const onChange = (e) => {
    searchFilter(e.target.value, colors, setFilteredFloss);
  };

 
  return (<Container>
         <h1 className={s.title}>DMC Collection</h1>
        <div className={s.searchBox}>
          <p className={s.searchLabel}>Search by floss number or color name</p>
         <input
          type={"search"}
          placeholder={"enter query"}
          onChange={onChange}
          className={s.searchInput}
        ></input>
        </div>
         { filteredFloss.length > 0 &&
          <Section>
        <ColorsTable data={filteredFloss}/>
        </Section>} 
        { filteredFloss.length <=0 && <Section><h3 className={s.emptyTitle}>No floss by your request</h3></Section>}

      
      </Container>
    
  );
};

//   const colorsTable = () => {
//     const table = document.getElementById("colors");
//     const arr = [...table.rows];
//     const data = arr.map((tr) => {
//       const row = tr.querySelectorAll("td");
//       console.log({ ...row[0] });

//       return {
//         hex: { ...row[0] }.__reactProps$oqdg78o7lv?.bgcolor
//           ? { ...row[0] }.__reactProps$oqdg78o7lv.bgcolor
//           : "00",
//         dmcNumber: { ...row[1] }.__reactProps$oqdg78o7lv?.children
//           ? { ...row[1] }.__reactProps$oqdg78o7lv.children
//           : "00",
//         colorName: { ...row[2] }.__reactProps$oqdg78o7lv?.children
//           ? { ...row[2] }.__reactProps$oqdg78o7lv.children
//           : "00",
//         colorRUname: { ...row[3] }.__reactProps$oqdg78o7lv?.children
//           ? { ...row[3] }.__reactProps$oqdg78o7lv.children
//           : "00",
//       };
//     });
//     return data;
//   };
