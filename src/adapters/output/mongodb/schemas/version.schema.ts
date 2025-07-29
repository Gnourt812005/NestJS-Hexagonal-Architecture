import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type VersionDocument = HydratedDocument<Version>

@Schema()
export class Version {
  @Prop({
    type: Types.ObjectId, 
    ref: "Metadata",
    required: true  
  })
  idImage: Types.ObjectId

  @Prop()
  versionIndex: number

  @Prop()
  publicUrl: string

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop()
  isActive: Boolean
}

export const VersionSchema = SchemaFactory.createForClass(Version)