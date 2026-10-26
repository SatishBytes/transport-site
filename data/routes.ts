export interface TransportRoute {
  origin: string;
  destination: string;
  slug: string;
}

// Add routes here only after the business confirms that they are served.
export const routes: TransportRoute[] = [];
