import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { GiWallet, GiFoodTruck } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { SiCodechef } from "react-icons/si";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "violet"];

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  //custom shape for the bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
      y + height
    } ${x + width}, ${y + height}
        Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // pi chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = chartData.map((data) => {
    return { name: data.category, value: data.revenue };
  });

  return (
    <div>
      <h2 className="text-2xl">
        <span>
          Hello
          {user?.displayName ? " " + user.displayName : ""}, <br></br>
          <span className="text-3xl">Welcome Back !</span>
        </span>{" "}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:rounded-xl my-5">
        <div className="flex items-center px-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-l-xl">
          <div className="text-4xl text-white pl-4">
            <GiWallet />
          </div>
          <div className="stat place-items-center">
            <div className="stat-value text-white">${stats.revenue}</div>
            <div className="stat-title text-slate-100 text-xl font-bold">
              Revenue
            </div>
          </div>
        </div>

        <div className="flex items-center px-6 bg-gradient-to-r from-orange-500 to-slate-400 md:rounded-r-xl lg:rounded-r-none">
          <div className="text-4xl text-white pl-2">
            <FaUsers />
          </div>
          <div className="stat place-items-center">
            <div className="stat-value text-white">${stats.users}</div>
            <div className="stat-title text-slate-100 text-xl font-bold">
              Customers
            </div>
          </div>
        </div>

        <div className="flex items-center px-6 bg-gradient-to-r from-cyan-500 to-rose-400 md:rounded-l-xl lg:rounded-l-none">
          <div className="text-4xl text-white pl-2">
            <SiCodechef />
          </div>
          <div className="stat place-items-center">
            <div className="stat-value text-white">${stats.menuItems}</div>
            <div className="stat-title text-slate-100 text-xl font-bold">
              Products
            </div>
          </div>
        </div>

        <div className="flex items-center px-6 bg-gradient-to-r from-sky-600 to-violet-500 md:rounded-r-xl">
          <div className="text-4xl text-white pl-2">
            <GiFoodTruck />
          </div>
          <div className="stat place-items-center">
            <div className="stat-value text-white">${stats.orders}</div>
            <div className="stat-title text-slate-100 text-xl font-bold">
              Orders
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row items-center col-span-1 lg:col-span-2 my-5">
        <div className="lg:w-1/2 my-5 lg:pt-10">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="lg:w-1/2 pb-10 lg:pb-0">
          <PieChart width={600} height={300}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
