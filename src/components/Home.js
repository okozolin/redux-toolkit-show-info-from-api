import React, { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import Header from "./Header";
import Search from "./Search";
import Artist from "./Artist";
import { url } from "../utils";
import Api from "../services/services";

export default function Home() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const path = url(query);
  const eventsPath = url(`${data.name}/events`) + "&date=all";

  useEffect(() => {
    const getArtistData = async () => {
      setLoading(true);
      try {
        if (query.length > 3) {
          const res = await Api.getData(path);
          setData(res);
        } else {
          setData("");
        }
      } catch (err) {
        throw new Error(err.message);
      }
      setLoading(false);
    };

    getArtistData();
  }, [query, path]);

  //   useEffect(() => {
  //     const getEventsData = async () => {
  //       setLoading(true);
  //       try {
  //         if (data) {
  //           const res = await Api.getData(eventsPath);
  //           setEventsData(res);
  //         } else {
  //           setEventsData("");
  //         }
  //       } catch (err) {
  //         throw new Error(err.message);
  //       }
  //       setLoading(false);
  //     };
  //     getEventsData();
  //   }, [data, eventsPath]);

  console.log("query", query);
  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Search setSearchText={setQuery} />
        </Grid>
        <Grid item xs={12} sm={6}>
          Favorites
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item sm>
          <Artist data={data} events={eventsData} />
        </Grid>
      </Grid>
    </>
  );
}
