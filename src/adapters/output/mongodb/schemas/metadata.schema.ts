import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MetadataDocument = HydratedDocument<Metadata>

@Schema()
export class Metadata {
  @Prop({
    default: Date.now 
  })
  createdAt: Date
  
  @Prop({
    default: true
  })
  isActive: Boolean
}

export const MetadataSchema = SchemaFactory.createForClass(Metadata)