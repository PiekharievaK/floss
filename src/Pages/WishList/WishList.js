import { useEffect, useState } from "react";
import Container from "../../components/Container";
import Section from "../../components/Section";
import operations from "../../helpers/wishListOperations";
import { AddFlossForm } from "../../helpers/addfloss";
import { Counter } from "../../components/Counter/couter";
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
    <Container>
      <Section>
        <h3>WishList</h3>
        <button onClick={clearAll}>Clear all</button>
        <div>
          <AddFlossForm AddFloss={AddFloss} schema s />
          {wishList.length > 0 ? (
            <div className={s.wishlistBox}>
              {wishList.map((item) => {
                return (
                  <div key={item.label}>
                    <span className={s.label}>label: {item.label}</span>
                    <button
                      onClick={() => {
                        if (editMode !== item.label) {
                          setEditMode(item.label);
                        } else {
                          setEditMode("");
                        }
                      }}
                    >
                      {editMode !== item.label ? "edit" : "close"}
                    </button>
                    <ul className={s.labeledList}>
                      {item.flosses.map((floss) => (
                        <li key={floss.number + floss.count}>
                          <span>number: {floss.number}</span>{" "}
                          <span>count: {floss.count}</span>
                          {editMode === item.label && (
                            <div>
                              <Counter
                                card={floss}
                                setEditMode
                                changeThreats={() => {}}
                                updateOneFloss={ChangeCount}
                              />
                              <button onClick={() => deleteOne(floss._id)}>
                                trash
                              </button>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ) : (
            <h3>No flosses on list yet</h3>
          )}
        </div>
      </Section>
    </Container>
  );
};
