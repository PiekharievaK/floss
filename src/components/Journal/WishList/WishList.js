import { useEffect, useState } from "react";
import Button from "../../Button";
import Section from "../../Section";
import operations from "../../../helpers/wishListOperations";
import { AddFlossForm } from "../../../helpers/addfloss";
import { Counter } from "../../Counter/couter";
import sprite from "../../../images/sprite.svg";
import s from "./WishList.module.scss";

export const WishList = ({ user }) => {
  const [wishList, setWishList] = useState([]);
  const [editMode, setEditMode] = useState("");

  const { getAll, addFloss, deleteFloss, clearWishList, updateOneFloss } =
    operations;

  useEffect(() => {
    getAll(user, setWishList);
  }, []);

  const AddFloss = async (e, floss) => {
    await addFloss(user.collectionId, floss);
    await getAll(user, setWishList);
  };

  const ChangeCount = async (flossId, counter) => {
    await updateOneFloss(user.collectionId, { id: flossId, count: counter });
    await getAll(user, setWishList);
  };

  const deleteOne = async (flossId) => {
    await deleteFloss(user.collectionId, flossId);
    await getAll(user, setWishList);
  };

  const clearAll = async () => {
    await clearWishList(user.collectionId);
    await getAll(user, setWishList);
  };

  return (
    <Section>
      <h3>WishList</h3>
      {wishList.length > 0 && (
        <div className={s.optionsBox}>
          <Button onClick={clearAll}>Clear all</Button>
          {/* <Button onClick={clearAll} >Add to my flosses all</Button> */}
        </div>
      )}
      <div>
        <AddFlossForm AddFloss={AddFloss} schema s={s} />
        {wishList.length > 0 ? (
          <ul className={s.wishlistBox}>
            {wishList.map((item) => {
              return (
                <li key={item.label} className={s.labeledList}>
                  <span className={s.label}>label: {item.label}</span>
                  {/* <Button className={s.editButton}>
                      Add all to my list
                    </Button> */}
                  <Button
                    className={s.editButton}
                    onClick={() => {
                      if (editMode !== item.label) {
                        setEditMode(item.label);
                      } else {
                        setEditMode("");
                      }
                    }}
                  >
                    {editMode !== item.label ? "edit items" : "close"}
                  </Button>

                  <ul className={s.labelCard}>
                    {item.flosses.map((floss) => (
                      <li key={floss.number + floss.count}>
                        <span>number: {floss.number}</span>{" "}
                        <span>count: {floss.count}</span>
                        {editMode === item.label && (
                          <div className={s.optionsBox}>
                            <Counter
                              card={floss}
                              setEditMode
                              changeThreats={() => {}}
                              updateOneFloss={ChangeCount}
                            />
                            <Button
                              className={s.deleteOneFloss}
                              onClick={() =>
                                deleteOne(floss._id ? floss._id : floss.id)
                              }
                            >
                              <svg width="15px" height="15px">
                                <use href={`${sprite}#icon-trash`}></use>
                              </svg>
                            </Button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        ) : (
          <h3>No flosses on list yet</h3>
        )}
      </div>
    </Section>
  );
};
