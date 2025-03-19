import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, useParams } from "react-router";
import { getAltTitles } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../components/spinner';

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieHeader = (props) => {
  const movie = props.movie;
  const navigate = useNavigate();
  console.log(movie);
  const { id } = useParams();
  const { data:alttitles, error, isPending, isError  } = useQuery({
    queryKey: ['alttitles', {id: id}],
    queryFn: getAltTitles,
  })

  if (isPending) {
      return <Spinner />;
    }
  
    if (isError) {
      return <h1>{error.message}</h1>;
    }
    console.log(alttitles.titles)

  return (
    <>
    <Paper 
        component="div" 
        sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            padding: 1.5,
            margin: 0,
        }}
      >
      <IconButton aria-label="go back" onClick={() => navigate(-1)} >
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">
        {movie.title}
        <a href={movie.homepage}>
          <HomeIcon color="primary" />
        </a>
        <br />
        <span sx={{ fontSize: "1.5rem" }}>{`   "${movie.tagline}"`} </span>
      </Typography>

      <IconButton aria-label="go forward" onClick={() => navigate(+1) } >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
    <Paper 
    component="ul"
    sx= {{...root}}
  >
    <li>
      <Chip label="Alternative Titles" color="primary" />
    </li>
    {alttitles.titles.map((g) => (
      <li key={g.title}>
        <Chip label={g.title} />
      </li>
    ))}
    </Paper>
    </>
  );
};

export default MovieHeader;
