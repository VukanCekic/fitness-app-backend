export interface AwsWorkoutResponse {
  took: number;
  timed_out: boolean;
  _shards: Shards;
  hits: Hits;
}

export interface Shards {
  total: number;
  successful: number;
  skipped: number;
  failed: number;
}

export interface Hits {
  total: number;
  max_score: null;
  hits: Hit[];
}

export interface Hit {
  _index: Index;
  _type: TypeEnum;
  _id: string;
  _score: null;
  _source: Source;
  sort: Array<number | string>;
}

export enum Index {
  SearchActivity = "search-activity",
}

export interface Source {
  objectId: string;
  name: string;
  status: Status;
  type: SourceType;
  partner: Partner;
  country: Country;
  categories: string[];
  logicFlags: LogicFlag[];
  bookingMinimum: number;
  bookingPeriod: number;
  cancelationPeriod: number;
  city: string;
  description?: string;
  location?: Location;
  participationModes: ParticipationMode[];
  region: string;
  reservationEmail?: string;
  reservationTypes: ReservationType[];
  street: string;
  zipCode: string;
  createdAt: Date;
  updatedAt: Date;
  ACL: ACL;
  id: string;
  activityDate: ActivityDate;
  geo?: number[];
  bookingQuantity?: number;
  remoteId?: string;
  remoteProvider?: RemoteProvider;
  infoBox?: string;
  trainingHours?: string;
  bookingUnit?: BookingUnit;
  importantInfoBox?: ImportantInfoBox;
  reservationPhone?: string;
}

export interface ACL {
  "*": Empty;
}

export interface Empty {
  read: boolean;
}

export interface ActivityDate {
  objectId: string;
  status: Status;
  activity: Activity;
  start: End;
  end: End;
  startHours: number;
  endHours: number;
  dayOfWeek: number;
  region: string;
  repetition?: Repetition;
  minCapacity?: number;
  createdAt: Date;
  updatedAt: Date;
  ACL: ACL;
  bookableUntil: Date;
  atMaxCapacity: boolean;
  videostreamUrl: null;
  videostreamDescription: null;
  remoteId?: string;
  remoteProvider?: RemoteProvider;
  usedCapacity?: number;
  processTokens?: ProcessTokens;
}

export interface Activity {
  __type: ActivityType;
  className: TypeEnum;
  objectId: string;
}

export enum ActivityType {
  Pointer = "Pointer",
}

export enum TypeEnum {
  Activity = "Activity",
}

export interface End {
  __type: EndType;
  iso: Date;
}

export enum EndType {
  Date = "Date",
}

export interface ProcessTokens {
  VIDEOSTREAM_LINK_SENDOUT: VideostreamLinkSendout;
}

export interface VideostreamLinkSendout {
  token: string;
}

export enum RemoteProvider {
  Es = "es",
}

export enum Repetition {
  The1W = "1w",
  The2W = "2w",
}

export enum Status {
  Active = "active",
}

export enum BookingUnit {
  Minutes = "minutes",
  Unit = "unit",
}

export enum Country {
  At = "AT",
  Ch = "CH",
}

export interface ImportantInfoBox {
  title: Title;
  text: string;
  color: Color;
  icon: Icon;
}

export enum Color {
  The52A9C5 = "#52a9c5",
}

export enum Icon {
  Shield = "shield",
}

export enum Title {
  SafeWorkoutInfos = "Safe Workout Infos",
}

export type Location = {
  __type: LocationType;
  latitude: number;
  longitude: number;
};

export type LocationAndDate = {
  location: Location;
  start: string;
  end: string;
};

export enum LocationType {
  GeoPoint = "GeoPoint",
}

export enum LogicFlag {
  FeatEvsBookings = "FEAT_EVS_BOOKINGS",
  NoIncentives = "NO_INCENTIVES",
  WlMccert = "WL_MCCERT",
  WlVideostream = "WL_VIDEOSTREAM",
}

export enum ParticipationMode {
  Indoor = "indoor",
  Outdoor = "outdoor",
  Videostream = "videostream",
}

export interface Partner {
  name: string;
  objectId: string;
  logicFlags?: LogicFlag[];
  platform: Platform;
}

export enum Platform {
  Mc = "mc",
}

export enum ReservationType {
  Mail = "mail",
  Phone = "phone",
  SMS = "sms",
}

export enum SourceType {
  Course = "course",
}
