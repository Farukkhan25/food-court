import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
// import { useEffect, useState } from "react";

const useMenu = () => {
  const axiosPublic = useAxiosPublic();

  // DataLoad using states
  // const [menu, setMenu] = useState([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //     fetch("http://localhost:5000/menu")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setMenu(data);
  //         setLoading(false);
  //       });

  // }, []);

  // DataLoad using TanStake Query
  const { data: menu = [], isPending: loading, refetch } = useQuery({
    queryKey: ['menu'],
    queryFn: async () => {
      const res = await axiosPublic.get('/menu');
      return res.data;
    }
  })
  return [menu, loading, refetch];
};

export default useMenu;
