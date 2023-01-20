// import { colors } from "./colors";
import colors from "./flosses.json"
import { useState, useEffect } from "react";
import { searchFilter } from "../../helpers/searchFilter";
import { ColorsTable } from "../../components/ColorsTable/ColorsTable";
import Container from "../../components/Container"
import Section from "../../components/Section"
import s from "./ColorsPage.module.scss"

export const ColorsPage = () => {
  const [filteredFloss, setFilteredFloss] = useState(colors);
  const labels = Object.keys(colors[0].labels).filter(
    (label) => label !== "Bestex" && label !== "BELKA" && label !== "Kirova"
    );
    const [filterValue, setFilterValue]= useState("")
  const [selectedLabels, setSelectedLabels] = useState(labels)
  const [shownFlosses, setShownFlosses] = useState(colors)
   
    // useEffect(()=>{
      // пока список не из базы а из документа
      //   fetchAllFloss
      // }, [filteredFloss])

       useEffect(()=>{
       const newFlossesList =  colors.map(item=> { const s = Object.fromEntries(selectedLabels.map(i =>  [[i], item.labels[i]])); return {...item, labels: s}})
// console.log(filterValue);
setShownFlosses(newFlossesList)
// console.log(filteredFloss)
searchFilter(filterValue, newFlossesList, setFilteredFloss)
      }, [selectedLabels])
      
  const onChange = (e) => {
  //  console.log(filteredFloss);
    searchFilter(e.target.value, shownFlosses, setFilteredFloss);
    setFilterValue(e.target.value)
  };

const onCheck=(e)=>{
  if (!e.target.checked){
    setSelectedLabels(selectedLabels.filter(item => item!==e.target.value))
    // console.log(selectedLabels);
    return
  }
  setSelectedLabels([...selectedLabels, e.target.value ])

}

 
  return (<Container>
         <h1 className={s.title}>Flosses Collection</h1>
<div style={{margin: "5px", padding: "0px"}} ><h4 style={{margin: "5px", padding: "0px"}}>Choice label you want to see</h4> <div style={{display: "flex", justifyContent: "center"}}>
{labels.map(item =><div style={{display: "flex", marginRight: "10px", height: "25px"}} key={item}><p style={{margin: "0px"}}>{item}</p><input type="checkbox" name={item} value={item} onChange={onCheck} checked={selectedLabels.includes(item)}></input></div>)}</div></div>
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
        <ColorsTable data={filteredFloss} selectedLabels={selectedLabels}/>
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
