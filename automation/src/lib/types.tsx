
import z from "zod";
import { ConnectionProviderProps } from "../providers/connections-providers";
export type ConnectionTypes = 'Google Drive' | 'Notion' | 'Slack' | 'Discord' | 'LinkedIn' | 'Whatsapp' | 'Twitter' | 'Facebook' | 'Instagram' | 'GitHub';

export const EditUserProfileSchema = z.object({
  email: z.email('Required'),
  name: z.string().min(1, 'Required'),
})

export type Connection = {
  title: ConnectionTypes
  description: string
  image: string
  connectionKey: keyof ConnectionProviderProps
  accessTokenKey?: string
  alwaysTrue?: boolean
  slackSpecial?: boolean
}