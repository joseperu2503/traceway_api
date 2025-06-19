import { PlaceModel } from 'src/places/models/place-model';

export interface StartTrackingSessionParams {
  userId: string;
  destinationPlace: PlaceModel;
  distance: number;
}
