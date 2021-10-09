// import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 5, 12345 Some City",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 10, 12345 Some City",
//     description: "This is a second meetup!",
//   },
// ];

// props variable here is recieved from the
// async function getStaticProps()
function HomePage(props) {
  // UseState and UseEffect are not needed since data is being fetched
  // when it pre-renders when its built

  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   // send a http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

// // Every code you write in getServerSideProps will always run
// // on the server and never on the client
// // pre-renders with every response
// export async function getServerSideProps(context) {
//   // requests and response only in getServerSideProps
//   const req = context.req;
//   const res = context.res;

//   // fetch data from the API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//     // No need for revalidate becasue it runs every time
//     // a requests comes in
//   };
// }

// Faster than getServerSideProps
// Pre-renders data for the HomePage while it is built
export async function getStaticProps() {
  // fetch data from API
  const client = await MongoClient.connect(
    "mongodb+srv://admin:UJblnwupV3OPUYsJ@cluster0.nclkc.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // This page will be regenerated every 1 second if
    // there are requests for this page - revalidate
    revalidate: 1,
  };
}

export default HomePage;
