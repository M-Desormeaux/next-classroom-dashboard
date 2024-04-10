alter table "auth"."saml_providers" add column "name_id_format" text;

alter table "auth"."saml_relay_states" drop column "from_ip_address";

alter table "auth"."users" add column "is_anonymous" boolean not null default false;

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


