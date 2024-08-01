// Import necessary components
import Image from "next/image";
import Section from "../../structure/section";
import Container from "../../structure/container";
import SectionTitle from "../../blocks/section.title.block";
import button from "../../../styles/blocks/button.module.scss";
import BadgesBlock from "../../blocks/about.badges.block";
import about from "../../../styles/sections/index/about.module.scss";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const columns = [
  {
    width: 200,
    label: "URL",
    dataKey: "url",
  },
  {
    width: 120,
    label: "Username",
    dataKey: "username",
    numeric: true,
  },
  {
    width: 120,
    label: "Password",
    dataKey: "password",
    numeric: true,
  },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{
        borderCollapse: "separate",
        tableLayout: "fixed",
        backgroundColor: "var(--table-bg)",
        color: "var(--table-text)",
      }}
    />
  ),
  TableHead: React.forwardRef((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

VirtuosoTableComponents.Scroller.displayName = 'VirtuosoTableScroller';
VirtuosoTableComponents.Table.displayName = 'VirtuosoTable';
VirtuosoTableComponents.TableHead.displayName = 'VirtuosoTableHead';
VirtuosoTableComponents.TableRow.displayName = 'VirtuosoTableRow';
VirtuosoTableComponents.TableBody.displayName = 'VirtuosoTableBody';

const fixedHeaderContent = () => {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? "right" : "left"}
          style={{ width: column.width }}
          sx={{
            backgroundColor: "var(--table-header-bg)",
            color: "var(--table-header-text)",
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default function Technical() {
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState();
  const [load, setLoad] = React.useState(false);
  const [link, setLink] = React.useState("");

  const handleClick = (st) => {
    navigator.clipboard.writeText(st);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? "right" : "left"}
            sx={{ color: "var(--table-text)", fontSize: "15px" }}
            onClick={() => {
              handleClick(row[column.dataKey]);
            }}
          >
            {row[column.dataKey].substring(
              row[column.dataKey].length - 10,
              row[column.dataKey].length
            )}
            ...
            <ContentCopyIcon style={{ fontSize: "15px" }} />
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleSearch = async () => {
    setLoad(true);

    try {
      const response = await fetch(
        `/api/search?link=${encodeURIComponent(link)}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setRows(data);
    } catch (err) {
      console.log(err.message);
    }

    setLoad(false);
  };

  const handleDownloadJSON = () => {
    const data = JSON.stringify(rows, null, 2); // Pretty print JSON with 2-space indentation
    const blob = new Blob([data], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "row.json";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Section classProp={`${about.section} borderBottom`}>
      <Container spacing={["verticalXXXLrg"]}>
        <SectionTitle title="" preTitle="Search Website" subTitle="" />
        <Box
          sx={{
            width: "100%",
            backgroundColor: "var(--input-bg)",
            color: "var(--input-text)",
          }}
        >
          <TextField
            style={{ width: "100%", borderRadius: "30px" }}
            label="Website Address"
            onChange={(res) => setLink(res.target.value)}
            placeholder="https://website.com, http://website.com, website.com"
            id="fullWidth"
            InputLabelProps={{
              style: {
                color: "var(--input-text)",
              },
            }}
            InputProps={{
              style: {
                backgroundColor: "var(--input-bg)",
                color: "var(--input-text)",
                borderColor: "var(--input-border)",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "var(--input-border)",
                },
                "&:hover fieldset": {
                  borderColor: "var(--input-hover-bg)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--input-focus-border)",
                },
              },
              "& label.Mui-focused": {
                color: "var(--input-focus-border)",
              },
            }}
          />
        </Box>
        <LoadingButton
          onClick={() => {
            handleSearch();
          }}
          style={{ width: "50%", marginLeft: "25%", marginTop: "-8%" }}
          className={`button ${button.primary}`}
          loading={load}
          variant="outlined"
        >
          Search
        </LoadingButton>
        {rows && (
          <>
            <div style={{ width: "20%", marginBottom: "-5%" }}>
              <button onClick={() => handleDownloadJSON()} className={`button ${button.primary}`}>Download</button>
            </div>
            <div className={about.container}>
              <Paper style={{ height: 400, width: "100%", marginTop: "-5%" }}>
                <TableVirtuoso
                  data={rows}
                  components={VirtuosoTableComponents}
                  fixedHeaderContent={fixedHeaderContent}
                  itemContent={rowContent}
                />
              </Paper>
            </div>
          </>
        )}
        <section className={`${about.content} ${about.container}`}>
          <div className={about.copy}>
            <BadgesBlock
              title="Power By NodeJs, NextJs"
              copy=""
              list={tech}
              block="tech"
              fullContainer="fullContainer"
              icon="laptop-code"
              containerClass={about.container}
              headerIcon={about.icon}
            />
          </div>
          <div className={`${about.image} ${about.technicalSvg}`}>
            <Image
              src="/img/dataism-24.svg"
              width={477}
              height={1111}
              alt="Data Strings 01 by Colorpong: https://ywft.us/2177b695b"
            />
          </div>
        </section>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Copied To Clipboard"
        action={action}
      />
 {/* <SectionGridBg gridSize={4}/> */}
 </Section>
  );
}

// Define the tech array outside the component
const tech = [
  { key: "javascript", name: "JavaScript", type: "devicon" },
  { key: "nodejs", name: "NodeJS", type: "devicon" },
  { key: "react", name: "React", type: "devicon" },
  { key: "nextjs", name: "NextJS", type: "devicon" },
  { key: "html5", name: "HTML5", type: "devicon" },
  { key: "css3", name: "CSS3", type: "devicon" },
  { key: "sass", name: "SASS", type: "devicon" },
  { key: "git", name: "Git", type: "devicon" },
  { key: "mysql", name: "MySQL", type: "devicon" },
];