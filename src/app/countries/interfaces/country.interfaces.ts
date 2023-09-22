export enum Region {
  Africa   = 'Africa',
  Americas = 'Americas',
  Asia     = 'Asia',
  Europe   = 'Europe',
  Oceania  = 'Oceania'
}

export interface SmallCountry{
  name: string;
  cca3: string;
  borders: string[];
}

export interface Country {
  name:         Name;
  cca3:         string;
  status:       Status;
  idd:          Idd;
  capital:      string[];
  altSpellings: string[];
  region:       string;
  subregion:    Subregion;
  languages:    Languages;
  translations: { [key: string]: Translation };
  latlng:       number[];
  landlocked:   boolean;
  borders?:     string[];
  area:         number;
  demonyms:     Demonyms;
  flag:         string;
  maps:         Maps;
  population:   number;
  gini?:        { [key: string]: number };
  fifa?:        string;
  car:          Car;
  timezones:    string[];
  continents:   string[];
  flags:        Flags;
  coatOfArms:   CoatOfArms;
  startOfWeek:  StartOfWeek;
  capitalInfo:  CapitalInfo;
  postalCode?:  PostalCode;
}

export interface CapitalInfo {
  latlng: number[];
}

export interface Car {
  signs: string[];
  side:  Side;
}

export enum Side {
  Left = "left",
  Right = "right",
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export interface Currencies {
  MDL?: All;
  CHF?: All;
  EUR?: All;
  GBP?: All;
  IMP?: All;
  BGN?: All;
  RSD?: All;
  NOK?: All;
  BYN?: All;
  BAM?: BAM;
  GGP?: All;
  ALL?: All;
  PLN?: All;
  DKK?: All;
  FOK?: All;
  GIP?: All;
  ISK?: All;
  CZK?: All;
  RON?: All;
  UAH?: All;
  SEK?: All;
  JEP?: All;
  HUF?: All;
  RUB?: All;
  MKD?: All;
}

export interface All {
  name:   string;
  symbol: string;
}

export interface BAM {
  name: string;
}

export interface Demonyms {
  eng:  Eng;
  fra?: Eng;
}

export interface Eng {
  f: string;
  m: string;
}

export interface Flags {
  png:  string;
  svg:  string;
  alt?: string;
}

export interface Idd {
  root:     string;
  suffixes: string[];
}

export interface Languages {
  ron?: string;
  fra?: string;
  gsw?: string;
  ita?: string;
  roh?: string;
  eng?: string;
  glv?: string;
  ell?: string;
  tur?: string;
  de?:  string;
  spa?: string;
  lat?: string;
  hrv?: string;
  bul?: string;
  slk?: string;
  est?: string;
  lav?: string;
  srp?: string;
  nno?: string;
  nob?: string;
  smi?: string;
  mlt?: string;
  gle?: string;
  bel?: string;
  rus?: string;
  por?: string;
  bos?: string;
  nfr?: string;
  sqi?: string;
  pol?: string;
  cat?: string;
  nld?: string;
  nor?: string;
  dan?: string;
  fao?: string;
  deu?: string;
  cnr?: string;
  lit?: string;
  isl?: string;
  ces?: string;
  ltz?: string;
  slv?: string;
  ukr?: string;
  swe?: string;
  nrf?: string;
  fin?: string;
  hun?: string;
  mkd?: string;
}

export interface Maps {
  googleMaps:     string;
  openStreetMaps: string;
}

export interface Name {
  common:     string;
  official:   string;
  nativeName: { [key: string]: Translation };
}

export interface Translation {
  official: string;
  common:   string;
}

export interface PostalCode {
  format: string;
  regex:  string;
}

export enum StartOfWeek {
  Monday = "monday",
}

export enum Status {
  OfficiallyAssigned = "officially-assigned",
  UserAssigned = "user-assigned",
}

export enum Subregion {
  CentralEurope = "Central Europe",
  EasternEurope = "Eastern Europe",
  NorthernEurope = "Northern Europe",
  SoutheastEurope = "Southeast Europe",
  SouthernEurope = "Southern Europe",
  WesternEurope = "Western Europe",
}
