import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useContext, useEffect, useState } from "react";
import { HairCutsContext } from "../../context/hairCuts";
import { UserContext } from "../../context/user";
import { ExpenseContext } from "../../context/expenses";
import { IncomingContext } from "../../context/incoming";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import Invoices from "./../invoices/index";

const Dashboard = () => {
  const { getAllExpenses, monthlyEXP } = useContext(ExpenseContext);
  const { getAllUsers, users } = useContext(UserContext);
  const { getUpcomingHairCuts, allHairCuts } = useContext(HairCutsContext);
  const {
    getAllincomingHaircutsByMoth,
    incomingByMoth,
    getAllHairCutsByMoNTHAndCount,
    haircutsBydateAndHairCutsCount,
    count,
    count2,
  } = useContext(IncomingContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const month = new Date().getMonth() + 1;
  const [currentobj, setCurrentobj] = useState(5);
  const [currentobj2, setCurrentobj2] = useState({ totalPrice: 0 });
  const [currentInc, setCurrentInc] = useState({totalAmount:0,month:0,year:0});
  const [currentInc2, setCurrentInc2] = useState({ totalAmount: 0 });

  function findlastMonthObject(arr) {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i].month === month[currentMonth - 1] &&
        arr[i].year === currentYear
      ) {
        setCurrentobj2({
          totalPrice: arr[i].totalPrice,
          month: arr[i].month,
          year: arr[i].year,
        });
      }
    }
    return null;
  }
  function findCurrentMonthObject(arr) {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].month === month[currentMonth] && arr[i].year === currentYear) {
        setCurrentobj({
          totalPrice: arr[i].totalPrice,
          month: arr[i].month,
          year: arr[i].year,
        });
      }
    }
    return null;
  }
  function findCurrentMonthInc(arr) {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i]._id.month === currentMonth &&
        arr[i]._id.year === currentYear
      ) {
        setCurrentInc({
          totalAmount: arr[i].totalAmount,
          month: arr[i]._id.month,
          year: arr[i]._id.year,
        });
      }
    }
    return null;
  }
  function findlastMonthInc(arr) {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    console.log(arr)

    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i]._id.month === currentMonth - 1 &&
        arr[i]._id.year === currentYear
      ) {
        setCurrentInc2({
          totalAmount: arr[i].totalAmount,
          month: arr[i]._id.month,
          year: arr[i]._id.year,
        });
      }
    }
    return null;
  }
  useEffect(() => {
    getAllExpenses();
    getAllincomingHaircutsByMoth();
  }, []);
  useEffect(() => {
    findlastMonthObject(monthlyEXP);
    findlastMonthInc(incomingByMoth);
    findCurrentMonthInc(incomingByMoth);
    console.log('i was activated ////////////////////////////')
    findCurrentMonthObject(monthlyEXP);
  }, [getAllExpenses]);

  useEffect(() => {
    getUpcomingHairCuts();
    getAllUsers();
    getAllHairCutsByMoNTHAndCount();
  }, []);
  return (
    <Box m="20px">
     
    {console.log(currentInc)}

      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${users.length}`}
            subtitle="Clients"
            progress={`0.${users.length}`}
            increase={`+${users.length}%`}
            icon={
              <SupervisedUserCircleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={count}
            subtitle="Haircuts Amount"
            progress={`0.${(count- count2) / 100}`}
            increase={`+${(count- count2) / 100}%`}
            icon={
              <SummarizeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${currentobj.totalPrice}$`}
            subtitle="Expenses"
            progress={`0.${
              (currentobj.totalPrice - currentobj2.totalPrice) / 100
            }`}
            increase={`+${
              (currentobj.totalPrice - currentobj2.totalPrice) / 100
            }%`}
            icon={
              <MoneyOffIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${currentInc.totalAmount}$`}
            subtitle="Incomes"
            progress={`0.${
              (currentInc.totalPrice - currentInc.totalPrice) / 100
            }`}
            increase={`+${currentInc.totalAmount - currentInc2.totalAmount}%`}
            icon={
              <PriceCheckIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Barbers Haircuts
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Until Today:{allHairCuts.length}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Last Haircuts
            </Typography>
          </Box>
          {allHairCuts.map((val) => (
            <Box
              key={`${val._id}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  Client: {val.user["user_Name"]}
                </Typography>
                <Typography color={colors.grey[100]}>
                  Barber: {val.barber["barber_Name"]}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>
                {" "}
                {val.date[8]}
                {val.date[9]}-{val.date[5]}
                {val.date[6]} / {val.hour}
              </Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${val.hairCut["product_price"]}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
          Gross profit
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle   size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {currentInc.totalAmount - currentobj.totalPrice}$
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;