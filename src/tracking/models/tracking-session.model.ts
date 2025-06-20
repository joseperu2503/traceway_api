import { Place } from 'src/places/models/place.model';

export interface TrackingSession {
  id: string;
  destinationPlace: Place;
  startDate: Date;
  endDate: Date | null;
  estimatedEndDate: Date;
  statusId: string;
  radius: number;
}
