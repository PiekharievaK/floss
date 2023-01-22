import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { ImageCropper } from "../../../ImageCropper/ImageCropper";
import { Confirm } from "notiflix";
import sprite from "../../../../images/sprite.svg";
import s from "./SchemasList.module.scss";
import flosses from "../../../../Pages/ColorsPage/flosses.json";

export const SchemasList = ({
  schemasData,
  AddSchemaFloss,
  AddImage,
  deleteSchemaFloss,
  deleteOneSchema,
}) => {
  // const [label, setLabel] = useState("DMC");
  const [number, setNumber] = useState("");
  const [count, setCount] = useState("");
  const [otherLabel, setOtherLabel] = useState("");
  const [labels, setLabels] = useState(
    Object.keys(flosses[0].labels).filter(
      (label) => label !== "Bestex" && label !== "BELKA" && label !== "Kirova"
    )
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentSchemaId, setCurrentSchemaId] = useState(null);
  const [uploaded, setUploaded] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const isDark = useSelector((state) => state.theme.isDark);
  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile);
    const binaryData = [];
    binaryData.push(selectedFile);
    const url = URL.createObjectURL(
      new Blob(binaryData, { type: "	application/octet-stream" })
    );
    setUploaded(url);
    document.body.style.overflow = "hidden";
    // console.log(selectedFile);
  }, [selectedFile]);

  useEffect(() => {
    if (!croppedImage) {
      return;
    }
    document.body.style.overflow = "visible";
  }, [croppedImage]);

  useEffect(() => {
    if (otherLabel !== "Other") {
      return;
    }
    Confirm.prompt(
      "You label will be added to list",
      "Please enter you label here",
      "",
      "Save",
      "Cancel",
      (e) => {
        setLabels([...labels, e]);
        setOtherLabel("");
        return;
      },
      () => {
        setOtherLabel("");
        return;
      },
      {
        titleColor: "#80bdff",
        okButtonBackground: "#80bdff",
      }
    );

    // console.log(labels);
  }, [otherLabel]);

  const filePicker = useRef(null);

  const handleChange = ({ target }) => {
    switch (target.name) {
      case "selectedFile":
        return setSelectedFile(target.files[0]);
      case "number":
        return setNumber(target.value);
      case "count":
        return setCount(target.value);
      case "label":
        return setOtherLabel(target.value);
      default:
        return;
    }
  };

  const AddFloss = async (e) => {
    e.preventDefault();
    // console.log(
    //   e.target[0].options.selectedIndex,
    //   e.target[0].options[e.target[0].options.selectedIndex].innerHTML
    // );

    const label =
      e.target[0].options[e.target[0].options.selectedIndex].innerHTML;
    await AddSchemaFloss(e, { label, number, count });
    setNumber("");
    setCount("");
    e.target[1].value = "";
    e.target[2].value = "";
    // e.target.reset()
  };

  const deleteFloss = async (e) => {
    const { flossid } = e.currentTarget.parentNode.dataset;
    const { label, schemaid } = e.currentTarget.parentNode.parentNode.dataset;
    // console.log(flossid, label, schemaid);
    deleteSchemaFloss(schemaid, label, flossid);
  };

  const closeImageChange = () => {
    setSelectedFile(null);
    setUploaded(null);
    setCroppedImage(null);
    setCurrentSchemaId(null);
  };

  const pickFile = (e) => {
    // ссылка на видео отправки файла
    // https://www.youtube.com/watch?v=xPRA4jixCX8&ab_channel=%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB%D0%9D%D0%B5%D0%BF%D0%BE%D0%BC%D0%BD%D1%8F%D1%89%D0%B8%D0%B9

    // ссылка на видео получения файла
    // https://www.youtube.com/watch?v=9tA-wuuLkPw&ab_channel=%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB%D0%9D%D0%B5%D0%BF%D0%BE%D0%BC%D0%BD%D1%8F%D1%89%D0%B8%D0%B9

    filePicker.current.click();
    setSelectedFile(null);
    setUploaded(null);
    setCroppedImage(null);
    setCurrentSchemaId(e.target.parentNode.parentNode.id);
    //  console.log(e.target.parentNode.parentNode.id);
  };

  const deleteSchema = async (e) => {
    // console.log(e.target.parentNode.id);
    deleteOneSchema(e.target.parentNode.id);
  };

  const AddSchemaImage = async (e) => {
    // console.log(e);
    const formData = new FormData();
    formData.append("image", croppedImage.split(",").pop());
    formData.append("name", `schema-${e.target.name}-image`);

    // console.log(formData);
    // const binaryData = []
    // // чтоб отправить надо через формдату
    // binaryData.push(formData)
    // // чтоб сразу посмотреть не через фом дату а напрямую
    // binaryData.push(croppedImage)

    // const url = URL.createObjectURL(new Blob(binaryData, {type: "	application/octet-stream"}))
    // console.log(url);
    try {
      await AddImage(e, e.target.id, formData);
      setCroppedImage(null);
      setSelectedFile(null);
      setCurrentSchemaId(null);
    } catch {
      console.log("problem with add file");
    }
  };

  // console.log(currentSchemaId);
  return (
    <div>
      {schemasData.length > 0 ? (
        <div className={isDark ? s.boxDark : s.box}>
          {schemasData && (
            <ul className={s.cardList}>
              {schemasData.map((schema, idx) => {
                return (
                  <li className={s.card} key={schema._id} id={schema._id}>
                    <h4>name: {schema.name}</h4>
                    <button
                      className={s.schemaDeleteBtn}
                      onClick={deleteSchema}
                    >
                      Delete Schema
                    </button>
                    {currentSchemaId === schema._id && croppedImage && (
                      <>
                        <p>Image preview:</p>
                        <img
                          src={croppedImage}
                          alt="img"
                          onClick={(e) => {
                            e.target.style.width =
                              e.target.style.width === "50px"
                                ? "200px"
                                : "50px";
                          }}
                          style={{ width: "50px", cursor: "pointer" }}
                        ></img>
                      </>
                    )}
                    {(currentSchemaId !== schema._id ||
                      (currentSchemaId === schema._id && !croppedImage)) &&
                      schema.image &&
                      schema.image.urlPreview.trim() !== "" && (
                        <img
                          src={schema.image.urlPreview}
                          alt="img"
                          onClick={(e) => {
                            // console.log(e.target.style.width);
                            e.target.style.width =
                              e.target.style.width === "50px"
                                ? "200px"
                                : "50px";
                          }}
                          style={{ width: "50px", cursor: "pointer" }}
                        ></img>
                      )}
                    <div className={s.addBox}>
                      <form
                        onSubmit={AddFloss}
                        id={schema._id}
                        className={s.form}
                      >
                        <select
                          name="label"
                          id="label"
                          onChange={handleChange}
                          className={s.input}
                        >
                          {labels.map((item) => (
                            <option name={item} value={item} key={item}>
                              {item}
                            </option>
                          ))}
                          {/* <option name="label" value="DMC">
                            DMC
                          </option>
                          <option name="Amhor" value="Amhor">
                          Anchor
                          </option>
                          <option name="label" value="DMC">
                          Madeira
                          </option>
                          <option name="label" value="DMC">
                          Gamma
                          </option> */}
                          <option name="Other" value="Other">
                            Other
                          </option>
                        </select>
                        <input
                          type="string"
                          placeholder="number"
                          name="number"
                          onChange={handleChange}
                          required
                          className={s.input}
                        ></input>
                        <input
                          type="number"
                          placeholder="count"
                          name="count"
                          onChange={handleChange}
                          required
                          className={s.input}
                        ></input>
                        <button type="submit">add new floss</button>
                      </form>
                      <button onClick={pickFile} id="file" className="file">
                        Pick schema image
                      </button>
                      {croppedImage && currentSchemaId === schema._id && (
                        <>
                          <button
                            id={schema._id}
                            name={schema.name}
                            onClick={AddSchemaImage}
                          >
                            {schema.image?.urlPreview.trim()
                              ? "Save new image"
                              : "Add image"}
                          </button>
                          <button onClick={closeImageChange}>
                            Close changes
                          </button>
                        </>
                      )}
                      <input
                        type="file"
                        name="selectedFile"
                        accept=".png, .jpg"
                        onChange={(e) => {
                          handleChange(e);
                          e.target.value = null;
                        }}
                        className="visually-hidden"
                        ref={filePicker}
                      ></input>
                    </div>
                    <div className={s.flossesBox}>
                      {schema.flossesList?.map((item) => {
                        return (
                          <div key={item._id}>
                            <span>{item.label}</span>
                            <ul
                              className={s.flossesList}
                              data-label={item.label}
                              data-schemaid={schema._id}
                            >
                              {item.flosses.map((floss) => {
                                return (
                                  <li
                                    className={s.item}
                                    key={floss._id}
                                    data-flossid={floss._id}
                                  >
                                    number:<span>{floss.number}</span> count:
                                    <span>{floss.count}</span>{" "}
                                    <button onClick={deleteFloss}>
                                      <svg width="15px" height="15px">
                                        <use
                                          href={`${sprite}#icon-trash`}
                                        ></use>
                                      </svg>
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}{" "}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : (
        <h3> No schemas yet</h3>
      )}
      {selectedFile && (
        <ImageCropper
          image={uploaded}
          setCroppedImage={setCroppedImage}
          setSelectedFile={setSelectedFile}
        />
      )}
    </div>
  );
};
