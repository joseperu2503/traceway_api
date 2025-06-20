import { PlaceModel } from 'src/places/models/place-model';

export interface TrackingSessionModel {
  id: string;
  destinationPlace: PlaceModel;
  startDate: Date;
  endDate: Date | null;
  estimatedEndDate: Date;
  statusId: string;
  radius: number;
}
