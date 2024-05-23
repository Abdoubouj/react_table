import { format } from "date-fns";
export const COLUMNS = [
  {
    Header: "Title",
    Footer: "Title",
    accessor: "title",
  },
  {
    Header: "Duration",
    Footer: "Duration",
    accessor: "duration",
  },
  {
    Header: "ProgramType",
    Footer: "ProgramType",
    accessor: "programType",
  },
  // {
  //   Header: "Created At",
  //   accessor: "meta.createdAt",
  //   Cell: ({ value }) => {
  //     return format(new Date(value), "dd/MM/yyyy");
  //   },
  // },
  {
    Header: "Created At",
    accessor: "createdAt",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
];
