import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { ImageCropper } from "../../../ImageCropper/ImageCropper";
import { AddFlossForm } from "../../../../helpers/addfloss";
import operations from "../../../../helpers/wishListOperations";
import sprite from "../../../../images/sprite.svg";
import s from "./SchemasList.module.scss";

export const SchemasList = ({
  schemasData,
  AddSchemaFloss,
  AddImage,
  deleteSchemaFloss,
  deleteOneSchema,
  collectionId,
}) => {
  const { addLabeledFlosses } = operations;
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentSchemaId, setCurrentSchemaId] = useState(null);
  const [uploaded, setUploaded] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [avialabelSchema, setAvialabelSchema] = useState({});
  const [editSchema, setEditSchema] = useState("");

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

  const filePicker = useRef(null);

  const handleChange = ({ target }) => {
    switch (target.name) {
      case "selectedFile":
        return setSelectedFile(target.files[0]);

      default:
        return;
    }
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
    deleteOneSchema(e.target.parentNode.parentNode.id);
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

  const toggleCheck = (e) => {
    const schemaId = e.target.parentNode.parentNode.id;
    // const keys = Object.keys(avialabelSchema);
    if (avialabelSchema.id !== schemaId) {
      setAvialabelSchema({ id: schemaId });
      return;
    }
    if (avialabelSchema.id === schemaId) {
      setAvialabelSchema({});
    }
  };

  const toggleEdit = (e) => {
    if (e.target.parentNode.parentNode.id === editSchema) {
      setEditSchema("");
      return;
    }
    console.log(e.target.parentNode.parentNode.id);
    setEditSchema(e.target.parentNode.parentNode.id);
  };

  const addToWishList = (collection, schemaId, wishLabel) => {
    const list = schemasData
      .find((schema) => schema._id === schemaId)
      .flossesList.find((list) => list.label === wishLabel).flosses;
    const availabel = list.filter((item) => item.availabel === false);
    const result = availabel.map((item) => {
      return {
        label: wishLabel,
        number: item.number,
        count: item.missingQuantity,
      };
    });
    console.log(list);
    addLabeledFlosses(collection, result);
  };

  return (
    <div>
      {schemasData.length > 0 ? (
        <div className={isDark ? s.boxDark : s.box}>
          {schemasData && (
            <ul className={s.cardList}>
              {schemasData
                .map((schema) => {
                  return (
                    <li className={s.card} key={schema._id} id={schema._id}>
                      <h4>name: {schema.name}</h4>
                      <div className={s.schemaDeleteBtn}>
                        {editSchema === schema._id ? (
                          <button onClick={deleteSchema}>Delete Schema</button>
                        ) : (
                          schema.flossesList.length > 0 && (
                            <button onClick={toggleCheck}>
                              {schema._id === avialabelSchema.id
                                ? "close"
                                : "check"}
                            </button>
                          )
                        )}
                        {avialabelSchema.id !== schema._id && (
                          <button onClick={toggleEdit}>
                            {editSchema === schema._id ? "close" : "edit"}
                          </button>
                        )}
                      </div>
                      {currentSchemaId === schema._id && croppedImage && (
                        <>
                          <p>Image preview:</p>
                          <img
                            src={croppedImage}
                            alt="cropped preview"
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
                        schema.image.urlPreview &&
                        schema.image.urlPreview.trim() !== "" && (
                          <img
                            src={schema.image.urlPreview}
                            onError={(e) => {
                              e.target.src =
                                "https://cdn.izap24.ru/images/prodacts/250/0/0.jpg";
                            }}
                            alt="schema view"
                            onClick={(e) => {
                              e.target.style.width =
                                e.target.style.width === "50px"
                                  ? "200px"
                                  : "50px";
                            }}
                            style={{ width: "50px", cursor: "pointer" }}
                          ></img>
                        )}
                      {(schema.flossesList.length < 1 ||
                        editSchema === schema._id) && (
                        <div className={s.addBox}>
                          <AddFlossForm
                            AddFloss={AddSchemaFloss}
                            schema={schema}
                            s={s}
                          />
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
                                {schema.image?.urlPreview?.trim()
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
                      )}
                      <div className={s.flossesBox}>
                        {schema.flossesList?.map((item) => {
                          return (
                            <div key={item._id}>
                              {item.flosses.filter(
                                (item) => item.availabel === true
                              ).length === item.flosses.length &&
                              avialabelSchema.id === schema._id ? (
                                <>
                                  <span style={{ border: "1px solid green" }}>
                                    {item.label}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span>{item.label}</span>{" "}
                                  {avialabelSchema.id === schema._id && (
                                    <button
                                      onClick={() =>
                                        addToWishList(
                                          collectionId,
                                          schema._id,
                                          item.label
                                        )
                                      }
                                    >
                                      {" "}
                                      add to wishList
                                    </button>
                                  )}
                                </>
                              )}
                              <ul
                                className={s.flossesList}
                                data-label={item.label}
                                data-schemaid={schema._id}
                              >
                                {item.flosses.map((floss) => {
                                  return avialabelSchema.id === schema._id ? (
                                    <li
                                      className={
                                        s.item +
                                        " " +
                                        (floss.availabel === true
                                          ? s.availabel
                                          : s.unavailable)
                                      }
                                      key={floss._id}
                                      data-flossid={floss._id}
                                    >
                                      <p>
                                        number:<span>{floss.number}</span>{" "}
                                        count:
                                        <span>{floss.count}</span>
                                      </p>
                                      {floss.availabel === false && (
                                        <span>
                                          need to:{" "}
                                          <span>{floss.missingQuantity}</span>
                                        </span>
                                      )}
                                    </li>
                                  ) : (
                                    <li
                                      className={s.item}
                                      key={floss._id}
                                      data-flossid={floss._id}
                                    >
                                      number:<span>{floss.number}</span> count:
                                      <span>{floss.count}</span>{" "}
                                      {editSchema === schema._id && (
                                        <button onClick={deleteFloss}>
                                          <svg width="15px" height="15px">
                                            <use
                                              href={`${sprite}#icon-trash`}
                                            ></use>
                                          </svg>
                                        </button>
                                      )}
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
                })
                .reverse()}
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
