import Container from "../../components/Container";
import { useSelector } from "react-redux";
import s from "./HomePage.module.scss";
import { Link } from "react-router-dom";

export const Homepage = ({ isLoggedIn }) => {
  const isDark = useSelector((state) => state.theme.isDark);
  // const isLoggedIn = true
  return (
    <Container>
      <div>
        <h1>Welcome</h1>

        {isLoggedIn ? (
          <div>
            <h3>This site is for keeping track of your flosses.</h3>

            <div className={isDark ? s.authorisedTextDark : s.authorisedText}>
              <p>
                On the <Link to="/JournalPage">Journal Page </Link>, you can see
                the threads and schemas you have, to start using this feature,
                you need to add flosses or schemas first. Our database already
                has a collection of flosses by some manufacture, therefore, you
                only need to enter the number of the floss and the quantity
                (count) that you have. If your threads are of another
                manufacture (label), then you can enter them yourself by
                choosing the color that suits your thread, writing down its
                number, manufacture (label), color name and quantity.
              </p>

              <h3>
                <Link to="/JournalPage/Floss">Your flosses collection:</Link>
              </h3>
              <p>
                When you add a new floss, it appears in your list, where you can
                edit its quantity, or remove it when you use it or buy more.
              </p>

              <p>
                When your collection is filled with threads, you can filter them
                by manufacturer (label) for easy search. You can also use the
                search box to find a specific thread from your collection by its
                number or color name.
              </p>

              <h3>
                <Link to="/JournalPage/schemas">Your schemas collection: </Link>
              </h3>

              <p>
                When you add a new scheme, it appears in your list, where you
                can add an image of it, add necessary threads, or remove it when
                you use it or don't want to have it anymore. You can also check
                if you have the threads needed for this scheme. If you are
                missing some threads, the application will count which threads
                and in what quantity, and with one button you can add all the
                missing threads to your wish list.
              </p>

              <h3>
                <Link to="/JournalPage/WishList">Your wish list: </Link>
              </h3>

              <p>
                You can add those threads that you can buy for your schemes.
                Threads can be added as one important thread on this page, and
                all threads that are needed for an existing scheme can be added
                at once. The program includes a large number of threads based on
                how many are needed for this scheme and how many there are in
                the following list of threads. You can add threads from schemes
                on the scheme page. After you have bought all the threads you
                have eaten, you can clear the entire list with one button, as
                well as delete or change the quantity for each thread separately
              </p>

              <p>
                The site is under construction, so there will be new features in
                the future.
              </p>
            </div>

            <p>Enjoy using!</p>
          </div>
        ) : (
          <div className={isDark ? s.textDark : s.text}>
            <p>
              On this site you can keep track of your threads using a
              user-friendly interface.
            </p>
            <p>
              You need to <Link to="/RegisterPage/SignUp">Sign Up</Link> or{" "}
              <Link to="/RegisterPage/LogIn">Log In</Link> to get started with
              the main features,
            </p>
            <p>
              Without registration, you can look at the color table, compare
              color numbers from different manufacturers and find the color you
              need at <Link to="/ColorsPage"> this page</Link>.
            </p>{" "}
          </div>
        )}
      </div>
    </Container>
  );
};
