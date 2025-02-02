import { ReactNode } from "react";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";

import { ThemedFontAwesome } from "../components/ThemedFontAwesome";
import { getWidthnHeight } from "../components/width";
import { ThemedMaterialIcons } from "../components/ThemedMaterialIcon";
import { ThemedIonicons } from "../components/ThemedIonicons";
import { ThemedFontAwesome6 } from "../components/ThemedFontAwesome6";
import { ThemedFontAwesome5 } from "../components/ThemedFontAwesome5";
import { ThemedFontisto } from "../components/ThemedFontisto";
import { ThemedFoundation } from "../components/ThemedFoundation";
import { ThemedAntDesign } from "../components/ThemedAntDesign";
import { ThemedEntypo } from "../components/ThemedEntypo";
import { ThemedEvilIcons } from "../components/ThemedEvilicons";
import { ThemedFeather } from "../components/ThemedFeather";
import { ThemedMaterialCommunityIcons } from "../components/ThemedMaterialCommunityIcon";
import { ThemedOcticons } from "../components/ThemedOctions";
import { ThemedZocial } from "../components/ThemedZocial";
import { ThemedSimpleLineIcons } from "../components/ThemedSimpleIcons";

const fontAwesome = "FontAwesome";
const fontAwesome5 = "FontAwesome5";
const fontAwesome6 = "FontAwesome6";
const fontisto = "Fontisto";
const foundation = "Foundation";
const materialIcons = "MaterialIcons";
const ionIcons = "Ionicons";
const antDesign = "AntDesign";
const entypo = "Entypo";
const evilIcons = "EvilIcons";
const feather = "Feather";
const materialCommunityIcons = "MaterialCommunityIcons";
const octIcons = "Octicons";
const zocial = "Zocial";
const simpleLineIcons = "SimpleLineIcons";

export type IconType =
  | "FontAwesome"
  | "FontAwesome5"
  | "FontAwesome6"
  | "Fontisto"
  | "Foundation"
  | "MaterialIcons"
  | "Ionicons"
  | "AntDesign"
  | "Entypo"
  | "EvilIcons"
  | "Feather"
  | "MaterialCommunityIcons"
  | "Octicons"
  | "Zocial"
  | "SimpleLineIcons";

export type VectorIconsProps<T extends IconType> = {
  uid?: string;
  id?: string;
  type?: IconType;
  title?: string;
  name?: T;
  iconSize?: number;
  icon?: (props: { name: T; iconSize: number }) => ReactNode;
};

// Define the exact name types for each icon family
export type FontAwesomeNames = React.ComponentProps<
  typeof ThemedFontAwesome
>["name"];
export type FontAwesome5Names = React.ComponentProps<
  typeof ThemedFontAwesome5
>["name"];
export type FontAwesome6Names = React.ComponentProps<
  typeof ThemedFontAwesome6
>["name"];
export type FontistoNames = React.ComponentProps<typeof ThemedFontisto>["name"];
export type FoundationNames = React.ComponentProps<
  typeof ThemedFoundation
>["name"];
export type MaterialIconsNames = React.ComponentProps<
  typeof ThemedMaterialIcons
>["name"];
export type IoniconsNames = React.ComponentProps<typeof ThemedIonicons>["name"];
export type AntDesignNames = React.ComponentProps<
  typeof ThemedAntDesign
>["name"];
export type EntypoNames = React.ComponentProps<typeof ThemedEntypo>["name"];
export type EvilIconsNames = React.ComponentProps<
  typeof ThemedEvilIcons
>["name"];
export type FeatherNames = React.ComponentProps<typeof ThemedFeather>["name"];
export type MaterialCommunityIconsNames = React.ComponentProps<
  typeof ThemedMaterialCommunityIcons
>["name"];
export type OctIconsNames = React.ComponentProps<typeof ThemedOcticons>["name"];
export type ZocialNames = React.ComponentProps<typeof ThemedZocial>["name"];
export type SimpleLineIconsNames = React.ComponentProps<
  typeof ThemedSimpleLineIcons
>["name"];

export const vectorIcons: VectorIconsProps<
  | FontAwesomeNames
  | FontAwesome5Names
  | FontAwesome6Names
  | FontistoNames
  | FoundationNames
  | MaterialIconsNames
  | IoniconsNames
  | AntDesignNames
  | EntypoNames
  | EvilIconsNames
  | FeatherNames
  | MaterialCommunityIconsNames
  | OctIconsNames
  | ZocialNames
  | SimpleLineIconsNames
>[] = [
  {
    id: "1",
    type: "FontAwesome",
    name: "cab",
    iconSize: Math.round(getWidthnHeight(6)?.width!),
    icon: ({ name, iconSize }) => (
      <ThemedFontAwesome
        colorType={"buttonBorder"}
        name={name as FontAwesomeNames}
        size={iconSize}
      />
    ),
  },
  {
    id: "2",
    type: "FontAwesome5",
    name: "cab",
    iconSize: Math.round(getWidthnHeight(6)?.width!),
    icon: ({ name, iconSize }) => (
      <ThemedFontAwesome5
        colorType={"buttonBorder"}
        name={name as FontAwesome5Names}
        size={iconSize}
      />
    ),
  },
  {
    id: "3",
    type: "FontAwesome6",
    name: "cab",
    iconSize: Math.round(getWidthnHeight(6)?.width!),
    icon: ({ name, iconSize }) => (
      <ThemedFontAwesome6
        colorType={"buttonBorder"}
        name={name as FontAwesome6Names}
        size={iconSize}
      />
    ),
  },
  {
    id: "4",
    type: "Fontisto",
    name: "cab",
    iconSize: Math.round(getWidthnHeight(6)?.width!),
    icon: ({ name, iconSize }) => (
      <ThemedFontisto
        colorType={"buttonBorder"}
        name={name as FontistoNames}
        size={iconSize}
      />
    ),
  },
  {
    id: "5",
    type: "Foundation",
    name: "cab",
    iconSize: Math.round(getWidthnHeight(6)?.width!),
    icon: ({ name, iconSize }) => (
      <ThemedFoundation
        colorType={"buttonBorder"}
        name={name as FoundationNames}
        size={iconSize}
      />
    ),
  },
  {
    id: "6",
    type: "MaterialIcons",
    name: "cab",
    iconSize: Math.round(getWidthnHeight(6)?.width!),
    icon: ({ name, iconSize }) => (
      <ThemedMaterialIcons
        colorType={"buttonBorder"}
        name={name as MaterialIconsNames}
        size={iconSize}
      />
    ),
  },
  {
    id: "7",
    type: "Ionicons",
    name: "cab",
    iconSize: Math.round(getWidthnHeight(6)?.width!),
    icon: ({ name, iconSize }) => (
      <ThemedIonicons
        colorType={"buttonBorder"}
        name={name as IoniconsNames}
        size={iconSize}
      />
    ),
  },
  {
    id: "8",
    type: "AntDesign",
    name: "cab",
    iconSize: Math.round(getWidthnHeight(6)?.width!),
    icon: ({ name, iconSize }) => (
      <ThemedAntDesign
        colorType={"buttonBorder"}
        name={name as AntDesignNames}
        size={iconSize}
      />
    ),
  },
  {
    id: "9",
    type: "Entypo",
    name: "cab",
    iconSize: Math.round(getWidthnHeight(6)?.width!),
    icon: ({ name, iconSize }) => (
      <ThemedEntypo
        colorType={"buttonBorder"}
        name={name as EntypoNames}
        size={iconSize}
      />
    ),
  },
  {
    id: "10",
    type: "EvilIcons",
    name: "cab",
    iconSize: Math.round(getWidthnHeight(6)?.width!),
    icon: ({ name, iconSize }) => (
      <ThemedEvilIcons
        colorType={"buttonBorder"}
        name={name as EvilIconsNames}
        size={iconSize}
      />
    ),
  },
  {
    id: "11",
    type: "Feather",
    name: "cab",
    iconSize: Math.round(getWidthnHeight(6)?.width!),
    icon: ({ name, iconSize }) => (
      <ThemedFeather
        colorType={"buttonBorder"}
        name={name as FeatherNames}
        size={iconSize}
      />
    ),
  },
  {
    id: "12",
    type: "MaterialCommunityIcons",
    name: "cab",
    iconSize: Math.round(getWidthnHeight(6)?.width!),
    icon: ({ name, iconSize }) => (
      <ThemedMaterialCommunityIcons
        colorType={"buttonBorder"}
        name={name as MaterialCommunityIconsNames}
        size={iconSize}
      />
    ),
  },
  {
    id: "13",
    type: "Octicons",
    name: "cab",
    iconSize: Math.round(getWidthnHeight(6)?.width!),
    icon: ({ name, iconSize }) => (
      <ThemedOcticons
        colorType={"buttonBorder"}
        name={name as OctIconsNames}
        size={iconSize}
      />
    ),
  },
  {
    id: "14",
    type: "Zocial",
    name: "cab",
    iconSize: Math.round(getWidthnHeight(6)?.width!),
    icon: ({ name, iconSize }) => (
      <ThemedZocial
        colorType={"buttonBorder"}
        name={name as ZocialNames}
        size={iconSize}
      />
    ),
  },
  {
    id: "15",
    type: "SimpleLineIcons",
    name: "cab",
    iconSize: Math.round(getWidthnHeight(6)?.width!),
    icon: ({ name, iconSize }) => (
      <ThemedSimpleLineIcons
        colorType={"buttonBorder"}
        name={name as SimpleLineIconsNames}
        size={iconSize}
      />
    ),
  },
];
