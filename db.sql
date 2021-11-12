DROP TABLE IF EXISTS public.users;
CREATE TABLE public.users (
  id integer NOT NULL,
  username character varying(255) NULL,
  created_at timestamp without time zone NOT NULL,
  session_stats integer NULL
);
ALTER TABLE
  public.users
ADD
  CONSTRAINT users_pkey PRIMARY KEY (id)


DROP TABLE IF EXISTS public.stats;
CREATE TABLE public.stats (
  favorite_note character varying(255) NULL,
  last_harmony character varying(255) NULL,
  last_octave character varying(255) NULL,
  last_note character varying(255) NULL,
  initial character varying(255) NULL,
  key character varying(255) NULL,
  mode character varying(255) NULL
);
