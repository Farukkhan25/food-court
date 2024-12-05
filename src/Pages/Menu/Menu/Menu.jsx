import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from "../../../assets/menu/banner3.jpg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from './MenuCategory/MenuCategory';

const Menu = () => {
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category ===  "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");
  
    return (
      <div>
        <Helmet>
          <title>Food Court | Menu</title>
        </Helmet>
        {/* main cover */}
        <Cover img={menuImg} title={"our menu"}></Cover>
        {/* Offered menu items */}
        <SectionTitle
          subHeading={"Don't Miss"}
          heading={"Today's Offer"}
        ></SectionTitle>
        <MenuCategory items={offered}></MenuCategory>
        {/* Dessert menu items */}

        <MenuCategory
          items={pizza}
          title={"pizza"}
          img={pizzaImg}
        ></MenuCategory>
        <MenuCategory
          items={salad}
          title={"salad"}
          img={saladImg}
        ></MenuCategory>
        <MenuCategory items={soup} title={"soup"} img={soupImg}></MenuCategory>
        <MenuCategory
          items={dessert}
          title={"desserts"}
          img={dessertImg}
        ></MenuCategory>
      </div>
    );
};

export default Menu;