export interface BackendPrismaResponseShape<D> {
  statusCode: number;
  data: D;
}
