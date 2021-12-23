CREATE TABLE public.sessions (
  stats integer NOT NULL,
  created_at timestamp without time zone NOT NULL,
  id integer NOT NULL
);
ALTER TABLE
  public.sessions
ADD
  CONSTRAINT sessions_pkey PRIMARY KEY (id);

CREATE TABLE public.stats (
  current_mode character varying(255) NOT NULL,
  current_key character varying(255) NOT NULL,
  initial character varying(255) NULL,
  last_note character varying(255) NULL,
  last_octave character varying(255) NULL,
  last_harmony character varying(255) NULL,
  session_id integer NOT NULL,
  id integer NOT NULL
);
ALTER TABLE
  public.stats
ADD
  CONSTRAINT stats_pkey PRIMARY KEY (id);