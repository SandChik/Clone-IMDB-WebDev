--
-- PostgreSQL database dump
--

-- Dumped from database version 17rc1
-- Dumped by pg_dump version 17rc1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'WRITER',
    'USER'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Actor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Actor" (
    id integer NOT NULL,
    name text NOT NULL,
    "urlPhoto" text,
    "countryId" integer NOT NULL
);


ALTER TABLE public."Actor" OWNER TO postgres;

--
-- Name: ActorToDrama; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ActorToDrama" (
    "actorId" integer NOT NULL,
    "dramaId" integer NOT NULL
);


ALTER TABLE public."ActorToDrama" OWNER TO postgres;

--
-- Name: Actor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Actor_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Actor_id_seq" OWNER TO postgres;

--
-- Name: Actor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Actor_id_seq" OWNED BY public."Actor".id;


--
-- Name: Award; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Award" (
    id integer NOT NULL,
    name text NOT NULL,
    "dramaId" integer
);


ALTER TABLE public."Award" OWNER TO postgres;

--
-- Name: AwardToCountry; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AwardToCountry" (
    "awardId" integer NOT NULL,
    "countryId" integer NOT NULL
);


ALTER TABLE public."AwardToCountry" OWNER TO postgres;

--
-- Name: Award_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Award_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Award_id_seq" OWNER TO postgres;

--
-- Name: Award_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Award_id_seq" OWNED BY public."Award".id;


--
-- Name: Country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Country" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Country" OWNER TO postgres;

--
-- Name: Country_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Country_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Country_id_seq" OWNER TO postgres;

--
-- Name: Country_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Country_id_seq" OWNED BY public."Country".id;


--
-- Name: Drama; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Drama" (
    id integer NOT NULL,
    title text NOT NULL,
    "alternativeTitle" text,
    year integer NOT NULL,
    synopsis text NOT NULL,
    availability text,
    "linkTrailer" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "countryId" integer NOT NULL,
    duration integer,
    "posterUrl" text,
    rating double precision,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    status integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."Drama" OWNER TO postgres;

--
-- Name: DramaToGenres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DramaToGenres" (
    "dramaId" integer NOT NULL,
    "genreId" integer NOT NULL
);


ALTER TABLE public."DramaToGenres" OWNER TO postgres;

--
-- Name: Drama_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Drama_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Drama_id_seq" OWNER TO postgres;

--
-- Name: Drama_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Drama_id_seq" OWNED BY public."Drama".id;


--
-- Name: Genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Genre" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Genre" OWNER TO postgres;

--
-- Name: Genre_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Genre_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Genre_id_seq" OWNER TO postgres;

--
-- Name: Genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Genre_id_seq" OWNED BY public."Genre".id;


--
-- Name: Review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Review" (
    id integer NOT NULL,
    content text NOT NULL,
    rating double precision,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "dramaId" integer NOT NULL,
    "userId" integer NOT NULL,
    author text NOT NULL,
    status boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Review" OWNER TO postgres;

--
-- Name: Review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Review_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Review_id_seq" OWNER TO postgres;

--
-- Name: Review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Review_id_seq" OWNED BY public."Review".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    password text NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Actor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Actor" ALTER COLUMN id SET DEFAULT nextval('public."Actor_id_seq"'::regclass);


--
-- Name: Award id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Award" ALTER COLUMN id SET DEFAULT nextval('public."Award_id_seq"'::regclass);


--
-- Name: Country id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Country" ALTER COLUMN id SET DEFAULT nextval('public."Country_id_seq"'::regclass);


--
-- Name: Drama id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Drama" ALTER COLUMN id SET DEFAULT nextval('public."Drama_id_seq"'::regclass);


--
-- Name: Genre id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Genre" ALTER COLUMN id SET DEFAULT nextval('public."Genre_id_seq"'::regclass);


--
-- Name: Review id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review" ALTER COLUMN id SET DEFAULT nextval('public."Review_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: Actor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Actor" (id, name, "urlPhoto", "countryId") FROM stdin;
283	Aml Ameen	https://image.tmdb.org/t/p/w500/wQ5zWlzmhvp2wG6gJiqoocEYHPJ.jpg	1
127	Blake Cooper	https://image.tmdb.org/t/p/w500/mFGnJZk83mOEF7duAi4uiaCcYvw.jpg	1
135	Dylan O'Brien	https://image.tmdb.org/t/p/w500/xN3GdvIlqsR838gDoblhPH0numP.jpg	1
239	Ki Hong Lee	https://image.tmdb.org/t/p/w500/96zkB3e07LB1hw2segekZS1PlQb.jpg	1
7	Thomas Brodie-Sangster	https://image.tmdb.org/t/p/w500/ovfgjgaE7aAXKYaemABX6pJFwRk.jpg	1
280	Kaya Scodelario	https://image.tmdb.org/t/p/w500/oKsGrXKGrcVoQJQ6pbjZDPOQJcM.jpg	1
30	Jacob Lofland	https://image.tmdb.org/t/p/w500/hlDVsEhgvNX5xnAcqX3HaBXAgNS.jpg	1
264	Rosa Salazar	https://image.tmdb.org/t/p/w500/f8MITeVNUrP9mMiXcPnCEZTIW56.jpg	1
291	Giancarlo Esposito	https://image.tmdb.org/t/p/w500/lBvDQZjxhIGMbH61iHnqerpbqHc.jpg	1
206	Will Poulter	https://image.tmdb.org/t/p/w500/9blYMaj79VGC6BHTLmJp3V5S8r3.jpg	1
286	Kate Winslet	https://image.tmdb.org/t/p/w500/e3tdop3WhseRnn8KwMVLAV25Ybv.jpg	1
162	Ray Stevenson	https://image.tmdb.org/t/p/w500/msafbswGI6uisRuNvQ8a1wMF5Ca.jpg	1
89	Ashley Judd	https://image.tmdb.org/t/p/w500/dofk0Y9YnGfoakFOonxoyFD7LOC.jpg	1
230	Shailene Woodley	https://image.tmdb.org/t/p/w500/tqNlTcDxDFQOQi0GpEtx0lqQyWt.jpg	1
308	Theo James	https://image.tmdb.org/t/p/w500/lSC4cMhcQeCjPFkK6qCjSGDSeR3.jpg	1
300	Ansel Elgort	https://image.tmdb.org/t/p/w500/pbU6qz8eudly20UE6u9T7jUXTgT.jpg	1
116	Jai Courtney	https://image.tmdb.org/t/p/w500/mwQ7aNiPYAbVi9jAEr99On7Y4zb.jpg	1
65	Tony Goldwyn	https://image.tmdb.org/t/p/w500/A3hXimbzDtFxQ1PXNo8gG7RZeN4.jpg	1
46	Karl Urban	https://image.tmdb.org/t/p/w500/7Y96dAfg0HcFrcLjlD5eD9N0uj4.jpg	1
165	Jack Quaid	https://image.tmdb.org/t/p/w500/320qW5yEbxpmyxQ3evmClJbtKag.jpg	1
303	Antony Starr	https://image.tmdb.org/t/p/w500/dyTQZSc6Jl7Ph1PvCTW7cx4ByIY.jpg	1
258	Erin Moriarty	https://image.tmdb.org/t/p/w500/dG7gLzlZCjZkjKMyoGIL8h5wjRj.jpg	1
84	Jessie T. Usher	https://image.tmdb.org/t/p/w500/b89iO2gzonAVUIPz7O29R53Yd6A.jpg	1
130	Laz Alonso	https://image.tmdb.org/t/p/w500/nmgOd3X2Xn3jIp9OLCRJzLExRWN.jpg	1
271	Chace Crawford	https://image.tmdb.org/t/p/w500/lZiIfkUmZoG1q6qKn79lVl9yaJn.jpg	1
250	Tomer Capone	https://image.tmdb.org/t/p/w500/r6s7dkYZUJpd00C7p9itT6Gp8XB.jpg	1
222	Karen Fukuhara	https://image.tmdb.org/t/p/w500/39xZ0fJEfq9Ql2fILUUDJmcHT15.jpg	1
306	Dylan Minnette	https://image.tmdb.org/t/p/w500/lGbZoPGTO4JYsiEXNtKpdEp6oMb.jpg	1
12	Christian Navarro	https://image.tmdb.org/t/p/w500/3GbOZdjoSVE2dkti9MKx44HidRi.jpg	1
200	Alisha Boe	https://image.tmdb.org/t/p/w500/qsg2aGkJ25fD67AnVdQZB6Ho8CX.jpg	1
148	Brandon Flynn	https://image.tmdb.org/t/p/w500/b1pEWBm0g2dxoNg1hX2d8My92Q8.jpg	1
248	Justin Prentice	https://image.tmdb.org/t/p/w500/yPH93Xgg5otKrDMn3Pb1Xbd8Yhm.jpg	1
19	Ross Butler	https://image.tmdb.org/t/p/w500/asJ1bchERNBwcWS3Do7xSaYNOmX.jpg	1
9	Devin Druid	https://image.tmdb.org/t/p/w500/nX5sYqPUNEpLTy2N3ndzKlCwnlD.jpg	1
205	Amy Hargreaves	https://image.tmdb.org/t/p/w500/jwE1G6jVtBi20ZGjC8U4GOWSIxw.jpg	1
90	Miles Heizer	https://image.tmdb.org/t/p/w500/fQeByexqxm2W6u9p1bMRNy12VtH.jpg	1
150	Joseph Gordon-Levitt	https://image.tmdb.org/t/p/w500/msb9UCBqBjGC95r7jns9K0C820h.jpg	1
287	Zooey Deschanel	https://image.tmdb.org/t/p/w500/30KQyjsXfrdm4Dcori7bDFTg9Le.jpg	1
82	Geoffrey Arend	https://image.tmdb.org/t/p/w500/bpqF3V5lK5GxuIU4VuTaVaztIvw.jpg	1
131	Chloë Grace Moretz	https://image.tmdb.org/t/p/w500/2Tlg632tAkfZNlnoF8CV8F9Pf63.jpg	1
123	Matthew Gray Gubler	https://image.tmdb.org/t/p/w500/tHjIUjHFjl4Kzc4XQ7JSd1EHYSU.jpg	1
193	Clark Gregg	https://image.tmdb.org/t/p/w500/nbxFbr2SaF4Sdc6HdsF193GInvJ.jpg	1
184	Patricia Belcher	https://image.tmdb.org/t/p/w500/8h5cLajSjv3fLIeAyuYyNxj7gte.jpg	1
11	Rachel Boston	https://image.tmdb.org/t/p/w500/lXsexhIX8oMhPnO85M0ocL0GhC2.jpg	1
55	Minka Kelly	https://image.tmdb.org/t/p/w500/AqiOBB4dF29sLjcnuV2QSvl2r1y.jpg	1
149	Benedict Cumberbatch	https://image.tmdb.org/t/p/w500/fBEucxECxGLKVHBznO0qHtCGiMO.jpg	1
76	Martin Freeman	https://image.tmdb.org/t/p/w500/vhs7quOGDG2mtFHvL7Lu7rU2dED.jpg	1
61	Una Stubbs	https://image.tmdb.org/t/p/w500/bz23ewpBlZNgSwCLqKPaa8ulKfQ.jpg	1
182	Rupert Graves	https://image.tmdb.org/t/p/w500/6tS8XMuTS04xXTfeWFjJED6SFBF.jpg	1
24	Louise Brealey	https://image.tmdb.org/t/p/w500/c7K2WWGZVA4tKWT0gBcPoLwmz3C.jpg	1
243	Mark Gatiss	https://image.tmdb.org/t/p/w500/jf6vBlhsDbKR8N3rjl5ulqz9ltB.jpg	1
196	Andrew Scott	https://image.tmdb.org/t/p/w500/4F8XpjyQCvtuu21WFm5d8RF5Rl.jpg	1
252	Amanda Abbington	https://image.tmdb.org/t/p/w500/aANxORdYZkGTUvhWOBAXk4iM92t.jpg	1
172	Jonathan Aris	https://image.tmdb.org/t/p/w500/46T3x7CePc22Z5KvkR4OulmVORU.jpg	1
107	Ashton Kutcher	https://image.tmdb.org/t/p/w500/LvIpFJZDNjRKD5Nl9QAaRxYIiv.jpg	1
235	Melora Walters	https://image.tmdb.org/t/p/w500/FSxiDBekrKgmzow1j3UhmNHOhI.jpg	1
166	Amy Smart	https://image.tmdb.org/t/p/w500/pkLFedmz2uMEb6EahyTazuelqKU.jpg	1
296	Elden Henson	https://image.tmdb.org/t/p/w500/8U5g30U76UJe0erbJdWjGLVz7NF.jpg	1
157	William Lee Scott	https://image.tmdb.org/t/p/w500/p6mISLnDP84gaBOiXSpOenFO8Zd.jpg	1
254	John Patrick Amedori	https://image.tmdb.org/t/p/w500/is4Tvt9xLdWa29AvgHTsOykLB1T.jpg	1
48	Irina Gorovaia	https://image.tmdb.org/t/p/w500/1DVczDp4n6Vv16TvuCcRfjhtSQY.jpg	1
54	Kevin G. Schmidt	https://image.tmdb.org/t/p/w500/tRRGseAd5mjHAPG75deffeE8ZKb.jpg	1
88	Jesse James	https://image.tmdb.org/t/p/w500/icZHNGVvuSCthiql6sB0jC6ppZc.jpg	1
10	Kim Tae-Ri	https://image.tmdb.org/t/p/w500/gFofVUeVlIvBJMUv7maHQwWdfsk.jpg	1
314	Nam Joo-Hyuk	https://image.tmdb.org/t/p/w500/zQdkQio6SyNpKoudDLc17BRQDGD.jpg	1
169	Kim Ji-yeon	https://image.tmdb.org/t/p/w500/pTHMIbgqBMjHG4kTkWUnKprQah4.jpg	1
52	Choi Hyun-Wook	https://image.tmdb.org/t/p/w500/o0Fl7HkkRgOTAOHDCy7JqIu7UoE.jpg	1
137	Lee Joo-Myoung	https://image.tmdb.org/t/p/w500/sysUnij3kUyYXYjFR5Qsb0Oa0XC.jpg	1
178	Seo Jae Hee	https://image.tmdb.org/t/p/w500/qoOOqPCwoNoZpZuelhOG1M4klgK.jpg	1
179	Kim Hye Eun	https://image.tmdb.org/t/p/w500/t7AoYjJdumIHgWAP7tJrIDXSJa0.jpg	1
160	Joo Bo Young	https://image.tmdb.org/t/p/w500/4pT96Mgui6QnHevuPEx6jIQZu49.jpg	1
211	Lee Yea Jin	https://example.com/placeholder.jpg	1
115	Iqbaal Dhiafakhri Ramadhan	https://image.tmdb.org/t/p/w500/AoETtoy7K04cRCtPrGBKTQjJ6BV.jpg	1
139	Angga Yunanda	https://image.tmdb.org/t/p/w500/1M3cLNTQLL1Vy6UbO9Er7FMqbND.jpg	1
151	Rachel Amanda	https://image.tmdb.org/t/p/w500/c2Ts2WgLSUUZV6xTmptKruPhQNW.jpg	1
86	Umay Shahab	https://image.tmdb.org/t/p/w500/i0Xvofb6qclnkXQayZKycMB1AVO.jpg	1
117	Aghniny Haque	https://image.tmdb.org/t/p/w500/5pFyssmQGxxCu5geM4WgCBJGrcU.jpg	1
192	Ari Irham	https://image.tmdb.org/t/p/w500/1GL3vMkA2MedpOskKMsNXTmZ2GO.jpg	1
215	Ganindra Bimo	https://image.tmdb.org/t/p/w500/6nsI1LCCadVaMKjKI5UAUiOwgae.jpg	1
147	Andrea Dian	https://image.tmdb.org/t/p/w500/7G9jaBQ437o4GSbefmsUHwjcOQv.jpg	1
18	Tio Pakusadewo	https://image.tmdb.org/t/p/w500/uAbKPJPbXVg1pi1bAEEkaMxc0Br.jpg	1
269	Millie Bobby Brown	https://image.tmdb.org/t/p/w500/3Qblbk5JIMxzlGVd1k1ucSKK7rf.jpg	1
126	Finn Wolfhard	https://image.tmdb.org/t/p/w500/5OVmquAk0W5BIsRlVKslEP497JD.jpg	1
266	Winona Ryder	https://image.tmdb.org/t/p/w500/zjwpCIeaFumamhhqz90ExqsBNqE.jpg	1
186	David Harbour	https://image.tmdb.org/t/p/w500/chPekukMF5SNnW6b22NbYPqAStr.jpg	1
58	Gaten Matarazzo	https://image.tmdb.org/t/p/w500/sUHpObjk9EkRVfpAY0auTZj3xx5.jpg	1
22	Caleb McLaughlin	https://image.tmdb.org/t/p/w500/6YjorSZyqFBl3f4sgcCQmOc1yoi.jpg	1
40	Natalia Dyer	https://image.tmdb.org/t/p/w500/bR65dHhAEod0TpBsuq5cpQH0Lai.jpg	1
310	Charlie Heaton	https://image.tmdb.org/t/p/w500/8Se6WZuvRmoB990bT29OPgVAyBo.jpg	1
276	Noah Schnapp	https://image.tmdb.org/t/p/w500/3GSWWrqQjio6G8L42ugGBGNks37.jpg	1
42	Kento Yamazaki	https://image.tmdb.org/t/p/w500/nUWXgjDfRxFJ3P20lyMJr8qDIJ0.jpg	1
225	Tao Tsuchiya	https://image.tmdb.org/t/p/w500/n2665l3bguzDTm5CnyP99ipU9Z0.jpg	1
261	Nijirô Murakami	https://image.tmdb.org/t/p/w500/ixKuljx33a5JqY28CsdEavflS1b.jpg	1
23	Eleanor Noble	https://image.tmdb.org/t/p/w500/kCbQ95ZhPN5hpSIcpaA2p80M2gl.jpg	1
77	Daniel Rindress-Kay	https://image.tmdb.org/t/p/w500/bnftfIvk8m39BPFdYR53TgpeWPv.jpg	1
307	Aya Asahina	https://image.tmdb.org/t/p/w500/zF3la0KvayUV3uACYPiBgCRIQcI.jpg	1
226	Daniel Brochu	https://image.tmdb.org/t/p/w500/u1Y4I2b3LhjAHTBMdNh7jgN6NED.jpg	1
146	Juliette Gosselin	https://image.tmdb.org/t/p/w500/mee5liXgHklccsrP8alyWJw7gGy.jpg	1
302	Yûtarô Watanabe	https://image.tmdb.org/t/p/w500/vAigHgkc3r4SmFCk7rmwHb0y2n.jpg	1
158	Sul Kyung Gu	https://image.tmdb.org/t/p/w500/9SqQcvVUPUziK37i5jIeUoqSOMB.jpg	1
21	Doh Kyung Soo	https://image.tmdb.org/t/p/w500/qjeam8N9lJU6dXtNoJi4PLfEGmn.jpg	1
176	Kim Hee Ae	https://image.tmdb.org/t/p/w500/69uUEdttLULH1yJ0pne2vxjWIXV.jpg	1
80	Park Byung Eun	https://image.tmdb.org/t/p/w500/8lDiEHjbBxPD8VNu1kGifMXhPUn.jpg	1
277	Jo Han Chul	https://image.tmdb.org/t/p/w500/sk0pVWe5wOAX6dVRzPkxMysfVWr.jpg	1
13	Choi Byung Mo	https://image.tmdb.org/t/p/w500/eANEWvYi7yBygB2CjNHgZIX9EmA.jpg	1
138	Hong Seung Hee	https://image.tmdb.org/t/p/w500/iF8vAp98sUh0CQ07mhrCB4euHPR.jpg	1
121	Choi Jung Woo	https://image.tmdb.org/t/p/w500/doHUwUDRML1uo0PVVRXblGAJhN3.jpg	1
189	Lee Sung Min	https://image.tmdb.org/t/p/w500/uYtqhJp4qNc6Ermi1tKruS0Hkuo.jpg	1
66	Jim Varney	https://image.tmdb.org/t/p/w500/zvBFmvKUrPvE6FW35O3RP4i1ZPp.jpg	1
103	Erik von Detten.	https://image.tmdb.org/t/p/w500/7fHjKnLKmqzR0kmvRPLxpQE7BsK.jpg	1
173	Don Rickles	https://image.tmdb.org/t/p/w500/iJLQV4dcbTUgxlWJakjDldzlMXS.jpg	1
78	Annie Potts	https://image.tmdb.org/t/p/w500/tlGnlsTOLiGO5xNGEnTZI4psmEp.jpg	1
284	John Morris	https://image.tmdb.org/t/p/w500/lSdNMhN3DoXEQJ37IeOD5mTMUQK.jpg	1
73	Jodi Benson	https://image.tmdb.org/t/p/w500/2qX8QKHCaFWnCcIhb3VgZeX9HPz.jpg	1
297	Tim Allen	https://image.tmdb.org/t/p/w500/PGLz0YLg4eB49BA6QxzHF5czxX.jpg	1
91	Joan Cusack	https://image.tmdb.org/t/p/w500/59UIeHZFYrKyP20lXqijtfTXglO.jpg	1
108	Wallace Shawn	https://image.tmdb.org/t/p/w500/wVaM1WlFKDce4esThwL4XtNLhOe.jpg	1
274	Keanu Reeves	https://image.tmdb.org/t/p/w500/4D0PpNI0kmP58hgrwGC3wCjxhnm.jpg	1
180	Tony Hale	https://image.tmdb.org/t/p/w500/ar4uapp4w5wMkThZcqWUNMSTO8z.jpg	1
112	Jordan Peele	https://image.tmdb.org/t/p/w500/kFUKn5g3ebpyZ3CSZZZo2HFWRNQ.jpg	1
214	Annie Potts.	https://image.tmdb.org/t/p/w500/tlGnlsTOLiGO5xNGEnTZI4psmEp.jpg	1
265	Edward Asner	https://image.tmdb.org/t/p/w500/j1kVS2sI3wWIHCCzzYD1buXAP9e.jpg	1
33	Jordan Nagai	https://image.tmdb.org/t/p/w500/oRtDEOuIO1yDhTz5dORBdxXuLMO.jpg	1
220	Christopher Plummer	https://image.tmdb.org/t/p/w500/dJe3nTCIToebjj1WHFHP7LmZKyk.jpg	1
34	Bob Peterson	https://image.tmdb.org/t/p/w500/kLwUBBmEIdchrLqwsYzgLB2B6q5.jpg	1
101	Delroy Lindo	https://image.tmdb.org/t/p/w500/76XFeM9FdbGkd0mxkEMstQu6na2.jpg	1
75	Jerome Ranft	https://image.tmdb.org/t/p/w500/fAK9KpVtPeZ9MTUXamfVqwUGBId.jpg	1
159	David Kaye	https://image.tmdb.org/t/p/w500/zTOUIqYx0ip4XaYcbTaxCxVY2Xf.jpg	1
253	Elie Docter.	https://example.com/placeholder.jpg	1
168	Paul Newman	https://image.tmdb.org/t/p/w500/bP2fByqNR7BorsUNuD6nSm0u2vJ.jpg	1
128	Cheech Marin	https://image.tmdb.org/t/p/w500/eecHDNRn9K80ZcuSocsMhQb2G1i.jpg	1
68	Guido Quaroni	https://image.tmdb.org/t/p/w500/ybv9rxZwwAg45uVOKIB1p2dwX0J.jpg	1
275	Jenifer Lewis	https://image.tmdb.org/t/p/w500/bdeUHXY4cXvhOW2nCblNachBYsM.jpg	1
142	Paul Dooley	https://image.tmdb.org/t/p/w500/7nTdbpU4wIsSDZ8WCPXNJOG9KPI.jpg	1
38	Michael Wallis	https://image.tmdb.org/t/p/w500/4TxYHUzqpRhbqjSf162WvpP0Hyu.jpg	1
245	George Carlin	https://image.tmdb.org/t/p/w500/6YKQHJzml6XviUADpSC6kfF56W9.jpg	1
39	Katherine Helmond	https://image.tmdb.org/t/p/w500/ewqxAgTyclJLwQi4WWU5QZiCM0Q.jpg	1
100	John Ratzenberger	https://image.tmdb.org/t/p/w500/oRtDEOuIO1yDhTz5dORBdxXuLMO.jpg	1
208	Joe Ranft	https://image.tmdb.org/t/p/w500/f1BoWC2JbCcfP1e5hKfGsxkHzVU.jpg	1
31	Michael Keaton	https://image.tmdb.org/t/p/w500/82rxrGxOqQW2NjKsIiNbDYHFfmb.jpg	1
304	Richard Petty	https://image.tmdb.org/t/p/w500/zaoJApUPT7C7Q46moNPDF3knqEg.jpg	1
143	Jeremy Piven	https://image.tmdb.org/t/p/w500/pBD1jcAZiDrHWcFpJtBtqLRD4gR.jpg	1
16	Bob Custas	https://example.com/placeholder.jpg	1
134	Michael Caine	https://image.tmdb.org/t/p/w500/bVZRMlpjTAO2pJK6v90buFgVbSW.jpg	1
257	Emily Mortimer	https://image.tmdb.org/t/p/w500/wsbq14Pr4jZzHu2fQNISRHpkPtM.jpg	1
246	Eddie Izzard	https://image.tmdb.org/t/p/w500/H8zar1LxJu5jgThl33z59g2iqO.jpg	1
64	Brent Musburger	https://image.tmdb.org/t/p/w500/u0mJBsgoRe1STcffOQ1Py4Egi3u.jpg	1
251	Joe Mantegna	https://image.tmdb.org/t/p/w500/4jzvAE6B1eoiZDUnDUuMazirCPP.jpg	1
207	Thomas Kretschmann	https://image.tmdb.org/t/p/w500/p1XYiekXjaUxHMztBALrez1Ud4J.jpg	1
305	Peter Jacobson	https://image.tmdb.org/t/p/w500/pGi9CnzEG4cLa2viUP89yvlPCyR.jpg	1
99	Bonnie Hunt	https://image.tmdb.org/t/p/w500/tT9C6uLztgN8OxJULq6F9iEzqlA.jpg	1
249	Darrell Waltrip	https://image.tmdb.org/t/p/w500/tUv0WzBjhZmuWDZspQbnfKnSjtO.jpg	1
262	Franco Nero	https://image.tmdb.org/t/p/w500/uiCrTolkOqpZYVxveMZeBx7sjZO.jpg	1
240	David Hobbs	https://image.tmdb.org/t/p/w500/y1LK2wczhWC0S8lfWoSLfmezhp5.jpg	1
198	Patrick Walker	https://image.tmdb.org/t/p/w500/1zfBSuAmOr1xXjNg4WzFWPm5B0Z.jpg	1
28	Jeff Garlin	https://example.com/placeholder.jpg	1
299	Michel Michelis	https://example.com/placeholder.jpg	1
119	Tony Shalhoub	https://image.tmdb.org/t/p/w500/1zfBSuAmOr1xXjNg4WzFWPm5B0Z.jpg	1
171	Owen Wilson	https://image.tmdb.org/t/p/w500/ntN3DL1Us5G2PCvlfq112vLXRKa.jpg	1
67	Larry the Cable Guy	https://image.tmdb.org/t/p/w500/34pX2sQj9DddaQWRBGukSWYdXxS.jpg	1
288	Cristela Alonzo	https://image.tmdb.org/t/p/w500/h4nQQZtVbB5Oimhu73eWmTbHtI4.jpg	1
57	Siân Eirian	https://example.com/placeholder.jpg	1
270	Cai Puri-Evans	https://example.com/placeholder.jpg	1
223	Heledd Jarman	https://example.com/placeholder.jpg	1
242	Santino Fontana	https://image.tmdb.org/t/p/w500/5wo0D9drLtLwdyZyDqNZRejgzoM.jpg	1
260	Kristen Bell	https://image.tmdb.org/t/p/w500/rP74dJXl7EjinGM0shQtUOlH5s2.jpg	1
27	Idina Menzel	https://image.tmdb.org/t/p/w500/dY4Uev9Z8DWEh2lAKrz7YyVNDQC.jpg	1
163	Josh Gad	https://image.tmdb.org/t/p/w500/17iKlfWZBDTAucqjkhRKHr9xjIz.jpg	1
174	Jonathan Groff	https://image.tmdb.org/t/p/w500/3kmnYKAzSc3Lp7iK5pcj97Hx9Cm.jpg	1
51	Ryan Gosling	https://image.tmdb.org/t/p/w500/lyUyVARQKhGxaxy0FbPJCQRpiaW.jpg	1
209	Ana de Armas	https://image.tmdb.org/t/p/w500/3vxvsmYLTf4jnr163SUlBIw51ee.jpg	1
227	Harrison Ford	https://image.tmdb.org/t/p/w500/n4dwIg6NbQzeMaS1yEKKlfNJH7a.jpg	1
170	Robin Wright	https://image.tmdb.org/t/p/w500/d3rIv0y2p0jMsQ7ViR7O1606NZa.jpg	1
105	Mark Arnold	https://image.tmdb.org/t/p/w500/dTfoxBUC6jpZry0ijlS8g4Y5cuS.jpg	1
15	Tomas	https://image.tmdb.org/t/p/w500/ymn6iQBJbQZN6BYI60YJDXVP4gF.jpg	1
96	Dave Bautista	https://image.tmdb.org/t/p/w500/ca3x0OfIKbJppZh8S1Alx3GfUZO.jpg	1
125	Sylvie Hoeks	https://example.com/placeholder.jpg	1
155	Jared Leto	https://example.com/placeholder.jpg	1
255	Daniel Radcliffe	https://image.tmdb.org/t/p/w500/iPg0J9UzAlPj1fLEJNllpW9IhGe.jpg	1
213	Rupert Grint	https://image.tmdb.org/t/p/w500/iFlkpTaOF6fGLqxz8b0PhI0i0zN.jpg	1
221	Emma Watson	https://image.tmdb.org/t/p/w500/A14lLCZYDhfYdBa0fFRpwMDiwRN.jpg	1
44	Richard Harris	https://image.tmdb.org/t/p/w500/51wDHVFNqrYgvUBMOcACAt4sJU9.jpg	1
234	Maggie Smith	https://image.tmdb.org/t/p/w500/qZyJ7DaOtkfqw58Iv7EqADi428P.jpg	1
237	Robbie Cltrane	https://image.tmdb.org/t/p/w500/b0pHwi2MeqxEpeWnF4Llihu53aJ.jpg	1
81	Fiona Shar	https://image.tmdb.org/t/p/w500/xMC8aPDwhEZcjRHEFcgytSr3BzM.jpg	1
63	Harry Melling	https://example.com/placeholder.jpg	1
29	Ian Hart	https://example.com/placeholder.jpg	1
122	Noriaki Sugiyama	https://image.tmdb.org/t/p/w500/szqqQ8T0gzuSxjU2rnWcthsaSJT.jpg	1
62	Noriko Shitaya	https://image.tmdb.org/t/p/w500/apIw7RO7gz4QFIE94t1Dx83AD2L.jpg	1
95	Ayako Kawasumi	https://image.tmdb.org/t/p/w500/vb4cgQUlZdaZT3P4RI27x2PGwpH.jpg	1
219	Kana Ueda	https://image.tmdb.org/t/p/w500/us6FMwXCeSUR2YyByxVcgOUjiIA.jpg	1
185	Jôji Nakata	https://image.tmdb.org/t/p/w500/wYhv4BtQnc6bZp2Qnh6GiYjmNKC.jpg	1
37	Hugh Jackman	https://image.tmdb.org/t/p/w500/4Xujtewxqt6aU0Y81tsS9gkjizk.jpg	1
17	Dakota Goyo	https://image.tmdb.org/t/p/w500/xHfxZDILa8JRZu5OoaXKiDa781o.jpg	1
289	Evangeline Lilly	https://image.tmdb.org/t/p/w500/pJHX2jd7ytre3NQbF9nlyWUqxH3.jpg	1
69	Anthony Mackie. Kevin Durand	https://image.tmdb.org/t/p/w500/dJb76YQDFmfJ6ptlvBvx0ZBP44C.jpg	1
6	Hope Davis	https://image.tmdb.org/t/p/w500/jRdR3q28gTPQU6eWRgiIqzGuMKU.jpg	1
204	James Rebhorn	https://image.tmdb.org/t/p/w500/4GI4p5aPfW0vI20IdJOcxD5BEqr.jpg	1
104	Karl Yune	https://image.tmdb.org/t/p/w500/rlcWonih6aWd3oXJ19LjZzKia9s.jpg	1
85	Olga Fonda	https://example.com/placeholder.jpg	1
26	Jiao Xu	https://image.tmdb.org/t/p/w500/tYVYOWMdX5UvoBdLLHRjWArsRFd.jpg	1
106	Guanlin Ji	https://image.tmdb.org/t/p/w500/l0gh3dtxCloqdKZZ9NZnrm3kums.jpg	1
247	Yig Huang	https://image.tmdb.org/t/p/w500/4waVqoZINWqElh32KqEAT6vSfM9.jpg	1
47	Dawei Shen	https://image.tmdb.org/t/p/w500/knUnjyggQHrnGBZ34b5WTX0mlpZ.jpg	1
111	Xianglong Meng	https://image.tmdb.org/t/p/w500/iWnDiYUZywlHBKOg11LVNS3akv9.jpg	1
92	Ye Sun	https://image.tmdb.org/t/p/w500/nNlM15XOEJU8A1dKuGEnN7NgxEy.jpg	1
194	Hong Shang	https://example.com/placeholder.jpg	1
120	Zitong Xia	https://example.com/placeholder.jpg	1
177	Miyu Irino	https://image.tmdb.org/t/p/w500/8qEEhHUObNvGQr4e6eqLu5z4qTz.jpg	1
94	Rumi Hiiragi	https://image.tmdb.org/t/p/w500/zITaVtFyc4xSM3mxSoPRWHbqgJI.jpg	1
298	Mari Natsuki	https://image.tmdb.org/t/p/w500/aRs3dGqA2bCuGSZ7lJGhQKe8rhp.jpg	1
36	Yurika Ishida	https://image.tmdb.org/t/p/w500/42WeHwCymsgJh3mLAyknCdRcef8.jpg	1
56	Youji Matsuda	https://image.tmdb.org/t/p/w500/fMonAnp3OQ16FmGy5SGhEJRcuVI.jpg	1
72	Yuko Tanaka	https://example.com/placeholder.jpg	1
312	Chika Sakamoto	https://image.tmdb.org/t/p/w500/lIIwnLmcgGpifpRflBq0kLW9EpK.jpg	1
2	Noriko Hidaka	https://image.tmdb.org/t/p/w500/43OuwsjqGf7JxpFpUvB75OdDDXQ.jpg	1
97	Hitosho Takagi	https://example.com/placeholder.jpg	1
20	Soma Santoki	https://image.tmdb.org/t/p/w500/g4I9g3IRcbxqTqDuOtgG9QicvfB.jpg	1
202	Masaki Suda	https://image.tmdb.org/t/p/w500/g7gXu0bE9jZ5LHjSqn1zHdNtiA1.jpg	1
210	Kou Shibasaki	https://image.tmdb.org/t/p/w500/gcuJz8dbYjtgsL8CAWMjVd5R7B9.jpg	1
50	Chieko Baishô	https://image.tmdb.org/t/p/w500/b8ANR4WfdUZtoU4ktlnMFzbq759.jpg	1
273	Takuya Kimura	https://image.tmdb.org/t/p/w500/sswCg8kvFsgSaVJwcIKKe4K7jOe.jpg	1
244	Tatsuya Gashûin	https://image.tmdb.org/t/p/w500/fLqIdkShknsJmZy4EfBWuWyHN4C.jpg	1
268	Ranbir Kapoor	https://image.tmdb.org/t/p/w500/ymYNHV9luwgyrw17NXHqbOWTQkg.jpg	1
301	Aishwarya Rai Bachchan	https://image.tmdb.org/t/p/w500/31L3uTQSeLS5g3EgALNdVbZT1W.jpg	1
3	Fawad Khan	https://image.tmdb.org/t/p/w500/zHvstgZfyb5AwEQfrWHV3bsjKV1.jpg	1
267	Alia Bhatt	https://image.tmdb.org/t/p/w500/fgID7oesvlmOa6zGnZY4bMrvFAW.jpg	1
197	Jaya Bachchan	https://image.tmdb.org/t/p/w500/nt9LBdPmI3lU1uAyko8FStnf1Xb.jpg	1
293	Saif Ali Khan	https://image.tmdb.org/t/p/w500/85uKiFDEcIqzLh0GwqYvecXw4uA.jpg	1
124	Preity Zinta	https://image.tmdb.org/t/p/w500/qY4GG9zj4JhgoiBaHhT5FIGeHu3.jpg	1
315	Hrithik Roshan	https://image.tmdb.org/t/p/w500/upKrdABAMK7jZevWAoPYI24iKlR.jpg	1
290	Kajol	https://image.tmdb.org/t/p/w500/h4m0TkDuEMCUNaPrQxMRyFb2AQ7.jpg	1
49	Amitabh Bachchan	https://image.tmdb.org/t/p/w500/u69PvpWqGkywSm0YjFiw77j9eqS.jpg	1
152	Shah Rukh Khan	https://image.tmdb.org/t/p/w500/tCEppfUu0g2Luu0rS5VKMoL4eSw.jpg	1
190	Katrina Kaif	https://image.tmdb.org/t/p/w500/sGxjQQ2ymrrplbRqFjwiJiUdc5w.jpg	1
218	Anushka Sharma	https://image.tmdb.org/t/p/w500/fPhX9mefBzco5ntQUZNJZG56Gbi.jpg	1
70	Salman Khan	https://image.tmdb.org/t/p/w500/n7pKtccmf2jVOz8Qn90q2ThqLge.jpg	1
132	Kareena Kapoor	https://image.tmdb.org/t/p/w500/pJZJJ93NwJq3kb3RWtaZBYVga1x.jpg	1
232	Harshaali Malhotra	https://example.com/placeholder.jpg	1
59	Megan Fox	https://image.tmdb.org/t/p/w500/smjWHgaVWUnAoxeg65gL4NE5Gnp.jpg	1
175	Ramon Rodriguez	https://image.tmdb.org/t/p/w500/1gobmVevxCWVhV7s6J2B0oWPDZj.jpg	1
79	Kevin Dunn	https://image.tmdb.org/t/p/w500/7dqLQjMNCQnuxQJQwQ5Ozz16LBq.jpg	1
161	Julie White	https://image.tmdb.org/t/p/w500/siiNmtZZldFSc2DwnfUJf0Teouh.jpg	1
279	Shia LaBeouf	https://image.tmdb.org/t/p/w500/ljlpaXEManszxIcshYQoqo4au03.jpg	1
43	Rosie Huntington-Whiteley	https://image.tmdb.org/t/p/w500/oq5iX2VoLGF41P5DmNDNJcczESR.jpg	1
8	Tyrese Gibson	https://image.tmdb.org/t/p/w500/1K315wBQBvDBuZMlzoozuGsqFXZ.jpg	1
144	John Turturro	https://image.tmdb.org/t/p/w500/6O9W9cJW0kCqMzYeLupV9oH0ftn.jpg	1
41	Patrick Dempsey	https://image.tmdb.org/t/p/w500/2PpaYtXdaDmNi3jap4qPIdyVesL.jpg	1
187	Nicola Peltz Beckham	https://image.tmdb.org/t/p/w500/rTaeR2ijxQGlVD3ztL7QmJTdEY4.jpg	1
203	Jack Reynor	https://image.tmdb.org/t/p/w500/1MSZks6afitwdYttLh617G6MBRQ.jpg	1
241	Stanley Tucci	https://image.tmdb.org/t/p/w500/q4TanMDI5Rgsvw4SfyNbPBh4URr.jpg	1
201	Kelsey Grammer	https://image.tmdb.org/t/p/w500/cjUCogoFRnFKAgeyRmGGpekz0TF.jpg	1
183	Titus Wellver	https://example.com/placeholder.jpg	1
285	Mark Wahlberg	https://image.tmdb.org/t/p/w500/bTEFpaWd7A6AZVWOqKKBWzKEUe8.jpg	1
133	Anthony Hopkins	https://image.tmdb.org/t/p/w500/9ukJS2QWTJ22HcwR1ktMmoJ6RSL.jpg	1
98	Josh Duhamel	https://image.tmdb.org/t/p/w500/5Rp9aeWdN2S623KCjwfii9MhDK1.jpg	1
153	Laura Haddock	https://image.tmdb.org/t/p/w500/6kRUvA7N3pMzznG9PdiqCOvxhGQ.jpg	1
14	Santiago Cabrera	https://image.tmdb.org/t/p/w500/ig1nyOlNKXsRy8xggYPLMcohpJA.jpg	1
145	Isabela Merced	https://image.tmdb.org/t/p/w500/cQlaWpBzyPx4p6PDz0cr1Y0DrWY.jpg	1
4	Anthony Ramos	https://image.tmdb.org/t/p/w500/seFm2fKh6reyZaaCg7DmRpodLCw.jpg	1
113	Dominique Fishback	https://image.tmdb.org/t/p/w500/zduC0PM7xKzFX4F7DH8CCt5gt6O.jpg	1
292	Luna Lauren Velez	https://image.tmdb.org/t/p/w500/98BvmTJCZHx0jPv0oNcv04Jkmfb.jpg	1
231	Dean Scott Vazquez	https://image.tmdb.org/t/p/w500/bo4Cmv8rXIYSskIbMFbrcIedFnG.jpg	1
216	Tobe Nwigwe	https://image.tmdb.org/t/p/w500/52Zu83S7T9tkzQeQuLyLJgUoXVa.jpg	1
224	Sarah Stiles	https://image.tmdb.org/t/p/w500/t1OuHZmz9GlbFu7bfOUg3nzIki6.jpg	1
281	Minami Takayama	https://image.tmdb.org/t/p/w500/4Gunxt2UWnAX74ZoXKtqK2rI0e.jpg	1
217	Kappei Yamaguchi	https://image.tmdb.org/t/p/w500/mJyxKRZxLv9D7LH5KcNSkjSKYOB.jpg	1
295	Wakana Yamazaki	https://image.tmdb.org/t/p/w500/1hBk3w3v1p1VuAHs5On9nvL2rX2.jpg	1
256	Rikiya Koyama	https://image.tmdb.org/t/p/w500/hsZm87BORLpzhaycBaWOD5xpjVC.jpg	1
114	Megumi Hayashibara	https://image.tmdb.org/t/p/w500/qiCiLNGaJmwql2uBpjnkY5zX5T2.jpg	1
229	Ken'ichi Ogata	https://image.tmdb.org/t/p/w500/iQLEawIP2593yrGy22GzLSpnfgl.jpg	1
313	Chafûrin	https://image.tmdb.org/t/p/w500/kiPG7EtYWxkj78US35gnTIMq5Dn.jpg	1
140	Wataru Takagi	https://image.tmdb.org/t/p/w500/amccLvyTl5JP7T9F05BojgQedNw.jpg	1
1		https://example.com/placeholder.jpg	1
212	Idris Elba	https://image.tmdb.org/t/p/w500/be1bVF7qGX91a6c5WeRPs5pKXln.jpg	1
136	Charlie Hunnam	https://image.tmdb.org/t/p/w500/ibWWSRGqgxNw9SC8E8hNv1Lvob1.jpg	1
93	Rinko Kikuchi	https://image.tmdb.org/t/p/w500/lv4UuorZtC37VaFAHO205u4lS73.jpg	1
167	Diego Klattenhof	https://image.tmdb.org/t/p/w500/mpdtCA5birAW89dtkuAdR73wr2H.jpg	1
32	Max Martini	https://image.tmdb.org/t/p/w500/gehOxb2cgNjcRnbAxaCUnFFJvAY.jpg	1
141	John Boyega	https://image.tmdb.org/t/p/w500/3153CfpgZQXTzCY0i74WpJumMQe.jpg	1
154	Scott eastwood	https://image.tmdb.org/t/p/w500/hBqXeKe2Z7VnAYe7tLTzIvr8po4.jpg	1
195	Cailee Spaeny	https://image.tmdb.org/t/p/w500/nquUc6o2dK4Pg4zjvl2HmZOfiRS.jpg	1
156	Burn Gorman	https://image.tmdb.org/t/p/w500/nl5V2mpfTnp8YSShtVYjgNjnv4M.jpg	1
110	Charlie Day	https://image.tmdb.org/t/p/w500/c0HNhjChGybnHa4eoLyqO4dDu1j.jpg	1
263	Tian Jing	https://image.tmdb.org/t/p/w500/nNlM15XOEJU8A1dKuGEnN7NgxEy.jpg	1
181	Jin Zhang	https://image.tmdb.org/t/p/w500/wk2iVLysBOkQxBGX6fkCYOq36r6.jpg	1
129	Audrey Tautou	https://image.tmdb.org/t/p/w500/moh0My0K3BP4d6AZx7jkPKqRORT.jpg	1
109	Jean Reno	https://image.tmdb.org/t/p/w500/dEQGpWhgRAN1xU8O1jyOVuQTHwo.jpg	1
272	Ian McKellen	https://image.tmdb.org/t/p/w500/5cnnnpnJG6TiYUSS7qgJheUZgnv.jpg	1
282	Paul Bettany	https://image.tmdb.org/t/p/w500/oNrDowF5cRtK5lJJuCAh0KeFizy.jpg	1
53	Alfred Molina	https://image.tmdb.org/t/p/w500/nJo91Czesn6z0d0pkfbDoVZY3sg.jpg	1
294	Tom Hanks	https://image.tmdb.org/t/p/w500/eKF1sGJRrZJbfBG1KirPt1cfNd3.jpg	1
228	Felicity Jones	https://image.tmdb.org/t/p/w500/35KdWSfTldNEdsn4MUGFIRoxJEu.jpg	1
309	Irrfan Khan	https://image.tmdb.org/t/p/w500/qkA9PpWJRw3rNjVkWfNZdwLvRZx.jpg	1
188	Ben Foster	https://image.tmdb.org/t/p/w500/4le1PMWTGp7y2IBmZEIOHfE3HAB.jpg	1
5	Omar Sy	https://image.tmdb.org/t/p/w500/laNZay6AfEzvEvY1NUH9UFiSD0a.jpg	1
233	Ana Ularu	https://image.tmdb.org/t/p/w500/oWMWDIZbiQWkIlxkhEM3RVzZclc.jpg	1
199	Ida Darvish	https://image.tmdb.org/t/p/w500/u0IusSD8zHVfhW4Uz7YjismbskA.jpg	1
191	Ryan Reynolds	https://image.tmdb.org/t/p/w500/algQ1VEno2W9SesoArWcZTeF617.jpg	1
118	Melanie Laurent	https://image.tmdb.org/t/p/w500/i99ogEo4gQyanCmHWYYoS6hsUqL.jpg	1
74	Manuel Garcia Rulfo	https://image.tmdb.org/t/p/w500/54Rk1hKfNdNKGHQMnONDGmNtUv3.jpg	1
25	Ben Hardy	https://image.tmdb.org/t/p/w500/b20ijbr2tbqlGvqZgkCpNZ5AYvS.jpg	1
35	Adria Arjona	https://image.tmdb.org/t/p/w500/gzrI92WZFANIBXOmXl3QGfb8Jak.jpg	1
87	Chris Hemsworth	https://image.tmdb.org/t/p/w500/piQGdoIQOF3C1EI5cbYZLAW1gfj.jpg	1
164	Anya Taylor-Joy	https://image.tmdb.org/t/p/w500/yZpghhtKM2VZHDx6JGAZqAVU4PL.jpg	1
236	Tom Burke	https://image.tmdb.org/t/p/w500/9L2O1mAwFQcfEbaB5CHIZUvnqUW.jpg	1
311	Alyla Browne	https://image.tmdb.org/t/p/w500/tcAQAzqk1z0PsVXqi8HODOVPQoY.jpg	1
316	Danila Kozlovzskiy	https://image.tmdb.org/t/p/w500/1j05cOkkSvoTHp6vOOLbSzGHKr1.jpg	1
60	Oksana Akinshina	https://image.tmdb.org/t/p/w500/AgN7t5MvzKi1w6awnGPhGURO5IB.jpg	1
83	Filipp Avdeev	https://example.com/placeholder.jpg	1
71	Ravshana Kurkova	https://example.com/placeholder.jpg	1
102	Bruno Ganz	https://image.tmdb.org/t/p/w500/siuPo91XYmYLXeCdq2DZTyNtpYq.jpg	1
45	Alexandra Maria Lara	https://image.tmdb.org/t/p/w500/whFI0dPAyXdUvGfnXcKf8W40mgk.jpg	1
259	Ulrich Matthes	https://image.tmdb.org/t/p/w500/wghkMqyMfaK1yWzwi142LJiJnBM.jpg	1
238	Juliane Kohler	https://image.tmdb.org/t/p/w500/v2eHSiEdAhu2mJWxEwa3Sqxtgg1.jpg	1
278	Corinna Harfouch	https://image.tmdb.org/t/p/w500/vPs5o94S0as2VSnj4JSATnNTmZa.jpg	1
\.


--
-- Data for Name: ActorToDrama; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ActorToDrama" ("actorId", "dramaId") FROM stdin;
135	1
239	1
7	1
206	1
280	1
283	1
127	1
135	2
239	2
7	2
280	2
30	2
264	2
291	2
135	3
239	3
7	3
280	3
30	3
264	3
291	3
206	3
230	4
308	4
286	4
116	4
162	4
89	4
230	5
308	5
300	5
116	5
65	5
46	6
165	6
303	6
258	6
84	6
130	6
271	6
250	6
222	6
306	7
12	7
200	7
148	7
248	7
19	7
9	7
205	7
90	7
150	8
287	8
82	8
131	8
123	8
193	8
184	8
11	8
55	8
149	9
76	9
61	9
182	9
24	9
243	9
196	9
252	9
172	9
107	10
235	10
166	10
296	10
157	10
254	10
48	10
54	10
88	10
10	11
314	11
169	11
52	11
137	11
178	11
179	11
160	11
211	11
115	12
139	12
151	12
86	12
117	12
192	12
215	12
147	12
18	12
269	13
126	13
266	13
186	13
58	13
22	13
40	13
310	13
276	13
42	14
225	14
261	14
23	14
77	14
307	14
226	14
146	14
302	14
158	15
21	15
176	15
80	15
277	15
13	15
138	15
121	15
189	15
294	16
297	16
91	16
201	16
173	16
66	16
108	16
100	16
78	16
294	17
297	17
173	17
66	17
108	17
100	17
78	17
284	17
103	17
294	18
297	18
91	18
173	18
108	18
100	18
78	18
284	18
73	18
294	19
297	19
91	19
108	19
100	19
274	19
180	19
112	19
214	19
265	20
33	20
100	20
220	20
34	20
101	20
75	20
159	20
253	20
171	21
99	21
168	21
67	21
128	21
119	21
68	21
275	21
142	21
38	21
245	21
39	21
100	21
208	21
31	21
304	21
143	21
16	21
171	22
67	22
134	22
257	22
246	22
144	22
64	22
251	22
207	22
305	22
99	22
249	22
262	22
240	22
198	22
119	22
28	22
299	22
119	23
171	23
67	23
288	23
57	23
270	23
223	23
260	24
27	24
163	24
174	24
242	24
260	25
27	25
163	25
174	25
51	26
209	26
227	26
170	26
105	26
15	26
96	26
125	26
155	26
255	27
213	27
221	27
44	27
234	27
237	27
81	27
63	27
29	27
255	28
213	28
221	28
44	28
234	28
237	28
81	28
63	28
29	28
122	29
62	29
95	29
219	29
185	29
122	30
62	30
95	30
219	30
185	30
122	31
62	31
95	31
219	31
185	31
37	32
17	32
289	32
69	32
6	32
204	32
104	32
85	32
26	33
106	33
247	33
47	33
111	33
92	33
263	33
194	33
120	33
177	34
94	34
298	34
36	35
56	35
72	35
312	36
2	36
97	36
20	37
202	37
210	37
50	38
273	38
244	38
1	38
268	39
218	39
301	39
3	39
267	39
197	40
152	40
293	40
124	40
152	41
315	41
132	41
290	41
49	41
152	42
190	42
218	42
70	43
132	43
232	43
279	44
59	44
8	44
98	44
144	44
175	44
79	44
161	44
279	45
43	45
8	45
98	45
144	45
41	45
285	46
187	46
203	46
241	46
201	46
183	46
285	47
133	47
98	47
153	47
14	47
145	47
4	48
113	48
292	48
231	48
216	48
224	48
281	49
217	49
295	49
256	49
114	49
229	49
313	49
140	49
281	50
217	50
295	50
256	50
114	50
229	50
313	50
140	50
1	50
281	51
217	51
295	51
256	51
114	51
229	51
313	51
140	51
1	51
281	52
217	52
295	52
256	52
114	52
229	52
313	52
140	52
1	52
281	53
217	53
295	53
256	53
114	53
229	53
313	53
140	53
1	53
212	54
136	54
93	54
110	54
167	54
156	54
32	54
141	55
154	55
195	55
156	55
110	55
263	55
181	55
35	55
294	56
129	56
109	56
272	56
282	56
53	56
294	57
228	57
309	57
188	57
5	57
233	57
199	57
191	58
118	58
74	58
25	58
35	58
87	59
164	59
236	59
311	59
316	60
60	60
83	60
71	60
102	61
45	61
259	61
238	61
278	61
\.


--
-- Data for Name: Award; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Award" (id, name, "dramaId") FROM stdin;
1	2015 Nominee Golden Trailer Best Fantasy / Adventure Poster	1
2	2016 Nominee Annie Outstanding Achievement in Animated Effects in a Live Action Production	2
3	2018 Nominee Teen Choice Award Choice Movie: Action	3
4	2014 Winner Teen Choice Award Choice Movie: Breakout Star	4
5	2016 Winner ASCAP Award Top Box Office Films	5
6	2022 Winner Saturn Award Best Streaming Action & Adventure Series	6
7	2020 Winner ReFrame Stamp Top 100 Popular Television (2019-2020)	7
8	2009 Winner National Board of Review Top Ten Film	8
9	2011 Winner Banff Rockie Award Best Continuing Series	9
10	2005 Nominee Saturn Award Best Science Fiction Film	10
11	2022 Indonesian Movie Actors Awards: Film Terfavorit	12
12	2022 Saturn Awards: Best Streaming Horror & Thriller Series, 2017 dan 2022 Dragon Awards: Best Science Fiction or Fantasy TV Series	13
13	2021 Asian Academy Creative Awards: Best Visual or Special VFX in TV Series or Feature Film	14
14	Special Achievement Academy Award	16
15	Annie Award for Outstanding Achievement for Music in a Feature Production	17
16	Academy Award untuk Film Animasi Terbaik	18
17	Best Animated Feature at the 25th Critics' Choice Awards	19
18	 Academy Award for Animated Feature	20
19	Best Achievement in Music Written for Motion Pictures, Original Song	21
20	Best Animated Feature Film of the Year	22
21	Choice Movie Actor: Comedy, Choice Movie: Comedy, Choice Summer Movie\n	23
22	Best Compilation Soundtrack for Visual, Best Song Written for Visual Media, Best Score Soundtrack for Visual Media	24
23	Best Compilation Soundtrack For Visual Media	25
24	Best Cinematography, Best Visual Effects, Best Special Visual Effects, Best Art Direction and Production Design, Outstanding Achievement in Cinematography in Theatrical Releases	26
25	Best Fantasy Film, Best Foreign Film	27
26	2003 BAFTA: Kids' Vote, Best Family Film - Live Action	28
27	2018 Nominee Anime Award (Best Film), 2019 Nominee Annual Award (Anime Movie of The Year) 4th place	29
28	2020 Nominee Annual Award (Anime Movie of The Year) 3rd place	30
29	2022 Nominee Annual Award (Anime Movie of The Year) 5th place	31
30	2011 Nominee IGN Award (Best Sci-Fi Movie), 2012 Nominee Golden Trailer (Most Original TV Spot)	32
31	2015 Nominee Huading Award (Best Animated Feature), 2015 Nominee Golden Rooster (Best Animated Feature)	33
32	2003 Annie Award for Outstanding Achievement in an Animated Feature, 2002 Tokyo Anime Award for Animation of The Year, 2001 Manichi Film Awards for Best Film and Best Animated Film	34
33	1997 Mainichi Film Awards for Best Film, Best Animated Film, and Japanese Movie Fans Choice, 1998 Japanese Academy Awards for Best Picture dan Best Music	35
34	1989 Mainichi Film Awards for Best Film, 1989 Blue Ribbon Awards for Best Film	36
35	2024 Mainichi Film Awards for Best Animation Film	37
36	2006 Annie Awards for Outstanding Achievement in an Animated Feature, 2006 Academy Awards for Best Animated Feature, 2005 Mainichi Film Awards for Best Animation Film	38
37	International Indian Film Academy Awards : Best Cinematography	39
38	International Indian Film Academy Awards : Best Director	40
39	International Indian Film Academy Awards : Best Dialogue	41
40	Filmfare Awards : Best Supporting Actress	42
41	International Indian Film Academy Awards : Best Film	43
42	2010 Winner BMI Film Music Award : Film Music\nSteve Jablonsky	44
43	2011 Winner Hollywood Film Award: Visual Effects of the Year	45
44	2014 Winner Hollywood Film Award: Visual Effects of the Year	46
45	2017 Winner Teen Choice Award : Choice: Fight (Bumblebee vs. Nemesis Prime) 	47
46	NAACP Image Award for Outstanding Original Score for TV/Film	48
47	- 	53
48	2013 Winner Hollywood Film Award\n2013 Winner Sierra Award	54
49	2007 Winner ASCAP Award\n2006 Winner IFMCA Award\r\n2006 Winner Golden Schmoes\r\n	56
50	2017 Winner ASCAP Award\n2017 Winner Gold Winner\r\n2016 Winner Canopus Award\r\n2019 Winner Best Documentary Short Film	57
51	2005 USA  Academy Awards	61
\.


--
-- Data for Name: AwardToCountry; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AwardToCountry" ("awardId", "countryId") FROM stdin;
\.


--
-- Data for Name: Country; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Country" (id, name) FROM stdin;
1	UNITED STATES
2	SOUTH KOREA
3	INDONESIA
4	JAPAN
5	ENGLAND
6	CHINA
7	INDIA
8	AUSTRALIA
9	RUSSIA
10	GERMANY
\.


--
-- Data for Name: Drama; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Drama" (id, title, "alternativeTitle", year, synopsis, availability, "linkTrailer", "createdAt", "countryId", duration, "posterUrl", rating, "updatedAt", status) FROM stdin;
15	The Moon	Deo mun	2023	A man is left in space due to an unfortunate accident while another man on Earth struggles to bring him back safely.	Vidio, Prime Video	https://youtu.be/gxMM6Ntv78A?feature=shared	2024-12-03 09:55:25.482	2	129	https://m.media-amazon.com/images/M/MV5BNzU4M2YzMzktNmJkZC00YzRmLWFkNWItZGM0YTc2NTBkNTAwXkEyXkFqcGdeQXVyMTU1MDczNjU1._V1_SX300.jpg	5.9	2024-12-03 09:55:25.44	0
59	Furiosa: A Mad Max Saga	-	2024	The origin story of renegade warrior Furiosa before her encounter and teamup with Mad Max.	Netflix	https://www.youtube.com/watch?v=XJMuhwVlca4	2024-12-03 09:55:25.482	8	148	https://m.media-amazon.com/images/M/MV5BNTcwYWE1NTYtOWNiYy00NzY3LWIwY2MtNjJmZDkxNDNmOWE1XkEyXkFqcGc@._V1_SX300.jpg	7.5	2024-12-03 09:55:25.44	0
1	The Maze Runner	-	2014	Awakening in an elevator, remembering nothing of his past, Thomas emerges into a world of about thirty teenage boys, all without past memories, who have learned to survive under their own set of rules in a completely enclosed environment, subsisting on their own agriculture and supplies. With a new boy arriving every thirty days, the group has been in "The Glade" for three years, trying to find a way to escape through the Maze that surrounds their living space (patrolled by cyborg monsters named 'Grievers'). They have begun to give up hope when a comatose girl arrives with a strange note, and their world begins to change with the boys dividing into two factions: those willing to risk their lives to escape and those wanting to hang onto what they've got and survive.KelseyJ	Netflix 	https://youtu.be/AwwbhhjQ9Xk?si=PJjZKZH7amEgeBhA	2024-12-03 09:55:25.482	1	113	https://m.media-amazon.com/images/M/MV5BMjUyNTA3MTAyM15BMl5BanBnXkFtZTgwOTEyMTkyMjE@._V1_SX300.jpg	6.8	2024-12-03 09:55:25.44	0
2	Maze Runner: The Scorch Trials	-	2015	The second chapter of the epic "Maze Runner" saga. Thomas (Dylan O'Brien) and his fellow Gladers face their greatest challenge yet: searching for clues about the mysterious and powerful organization known as WCKD. Their journey takes them to the Scorch, a desolate landscape filled with unimaginable obstacles. Teaming up with resistance fighters, the Gladers take on WCKD's vastly superior forces and uncover its shocking plans for them all.20th Century Fox	Netflix 	https://youtu.be/-44_igsZtgU?si=7ufXYEqfDzdeZRy2	2024-12-03 09:55:25.482	1	131	https://m.media-amazon.com/images/M/MV5BMjE3MDU2NzQyMl5BMl5BanBnXkFtZTgwMzQxMDQ3NTE@._V1_SX300.jpg	6.3	2024-12-03 09:55:25.44	0
3	Maze Runner: The Death Cure	-	2018	In the epic finale to The Maze Runner Saga, Thomas leads his group of escaped Gladers on their final and most dangerous mission yet. To save their friends, they must break into the legendary last city, a WCKD controlled labyrinth that may turn out to be the deadliest maze of all. Anyone who makes it out alive will get the answers to the questions the Gladers have been asking since they first arrived in the maze. Will Thomas and the crew make it out alive? Or will Ava Paige get her way?	Netflix 	https://youtu.be/4-BTxXm8KSg?si=RHS5aQagm2ylIRLq	2024-12-03 09:55:25.482	1	143	https://m.media-amazon.com/images/M/MV5BMTYyNzk3MDc2NF5BMl5BanBnXkFtZTgwMDk3OTM1NDM@._V1_SX300.jpg	6.3	2024-12-03 09:55:25.44	0
4	Divergent	-	2014	In a world divided by factions based on virtues, Tris learns she's Divergent and won't fit in. When she discovers a plot to destroy Divergents, Tris and the mysterious Four must find out what makes Divergents dangerous before it's too late.	Netflix 	https://youtu.be/Aw7Eln_xuWc?si=k4I06AV1XEC1TYzb	2024-12-03 09:55:25.482	1	139	https://m.media-amazon.com/images/M/MV5BMTYxMzYwODE4OV5BMl5BanBnXkFtZTgwNDE5MzE2MDE@._V1_SX300.jpg	6.6	2024-12-03 09:55:25.44	0
5	Insurgent	The Divergent Series: Insurgent	2015	Beatrice Prior must confront her inner demons and continue her fight against a powerful alliance which threatens to tear her society apart with the help from others on her side.	Netflix 	https://youtu.be/OBn_LRp-D7U?si=PozBNB6ftInKVdDe	2024-12-03 09:55:25.482	1	119	https://m.media-amazon.com/images/M/MV5BYmFhNWNlN2MtYzdkMy00MjhlLThkNDAtYThiMGYzZDc0NjgzXkEyXkFqcGdeQXVyMTU5MDA5MjI@._V1_SX300.jpg	6.2	2024-12-03 09:55:25.44	0
6	The Boys	-	2019	A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.	Amazon Prime	https://www.youtube.com/watch?v=5SKP1_F7ReE	2024-12-03 09:55:25.482	1	60	https://m.media-amazon.com/images/M/MV5BMWJlN2U5MzItNjU4My00NTM2LWFjOWUtOWFiNjg3ZTMxZDY1XkEyXkFqcGc@._V1_SX300.jpg	8.7	2024-12-03 09:55:25.44	0
7	13 Reasons Why	-	2017	Follows teenager Clay Jensen, in his quest to uncover the story behind his classmate and crush, Hannah, and her decision to end her life.	Netflix	https://www.youtube.com/watch?v=QkT-HIMSrRk	2024-12-03 09:55:25.482	1	60	https://m.media-amazon.com/images/M/MV5BYmRhZjkyMjEtNjRkMS00MDQ0LTg2NGMtMTQ3ZjE0NjJmMjM2L2ltYWdlXkEyXkFqcGdeQXVyNTY0MTkxMTg@._V1_SX300.jpg	7.5	2024-12-03 09:55:25.44	0
8	500 days of summer	-	2009	After being dumped by the girl he believes to be his soulmate, hopeless romantic Tom Hansen reflects on their relationship to try and figure out where things went wrong and how he can win her back.	Netflix	https://www.youtube.com/watch?v=PsD0NpFSADM	2024-12-03 09:55:25.482	1	95	https://m.media-amazon.com/images/M/MV5BMTk5MjM4OTU1OV5BMl5BanBnXkFtZTcwODkzNDIzMw@@._V1_SX300.jpg	7.7	2024-12-03 09:55:25.44	0
9	Sherlock	-	2010	The quirky spin on Conan Doyle's iconic sleuth pitches him as a "high-functioning sociopath" in modern-day London. Assisting him in his investigations: Afghanistan War vet John Watson, who's introduced to Holmes by a mutual acquaintance.	Amazon Prime	https://www.youtube.com/watch?v=gGqWqGOSTGQ	2024-12-03 09:55:25.482	1	88	https://m.media-amazon.com/images/M/MV5BNTQzNGZjNDEtOTMwYi00MzFjLWE2ZTYtYzYxYzMwMjZkZDc5XkEyXkFqcGc@._V1_SX300.jpg	9.1	2024-12-03 09:55:25.44	0
10	The Butterfly Effect	-	2004	Evan Treborn suffers blackouts during significant events of his life. As he grows up, he finds a way to remember these lost memories and a supernatural way to alter his life by reading his journal.	Netiflix	https://www.youtube.com/watch?v=LOS5YgJkjZ0	2024-12-03 09:55:25.482	1	113	https://m.media-amazon.com/images/M/MV5BODNiZmY2MWUtMjFhMy00ZmM2LTg2MjYtNWY1OTY5NGU2MjdjL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg	7.6	2024-12-03 09:55:25.44	0
11	Twenty Five Twenty One	Seumuldaseot Seumulhana	2022	In a time when dreams seem out of reach, a teen fencer pursues big ambitions and meets a hardworking young man who seeks to rebuild his life. At 22 and 18, they say each other's names for the first time, at 25 and 21, they fall in love.	Netflix	https://youtu.be/n7F8o-SoK8s?feature=shared	2024-12-03 09:55:25.482	2	70	https://m.media-amazon.com/images/M/MV5BNWYzODM2NGEtOWUyZi00MmEyLWFmYmItZDI3NDYzMGI0NWI2XkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_SX300.jpg	8.6	2024-12-03 09:55:25.44	0
12	Mencuri Raden Saleh	Stealing Raden Saleh	2022	To save his father, a master forger sets out to steal an invaluable painting with the help of a motley crew of specialists.	Netflix	https://youtu.be/DN3sRz_veBU?feature=shared	2024-12-03 09:55:25.482	3	52	https://m.media-amazon.com/images/M/MV5BNzIzMzhjNTEtNmIwMi00ZDY2LThlZTQtYThkY2Y5YjQxODdjXkEyXkFqcGdeQXVyMTE4MTAxMzUx._V1_SX300.jpg	7.3	2024-12-03 09:55:25.44	0
13	Stranger Things	-	2016	In 1980s Indiana, a group of young friends witness supernatural forces and secret government exploits. As they search for answers, the children unravel a series of extraordinary mysteries.	Netflix	https://youtu.be/mnd7sFt5c3A?feature=shared	2024-12-03 09:55:25.482	1	51	https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg	8.6	2024-12-03 09:55:25.44	0
14	Alice in BorderLand	Imawa no Kuni no Arisu	2020	Obsessed gamer Arisu suddenly finds himself in a strange, emptied-out version of Tokyo in which he and his friends must compete in dangerous games in order to survive.	Netflix	https://youtu.be/49_44FFKZ1M?feature=shared	2024-12-03 09:55:25.482	4	50	https://m.media-amazon.com/images/M/MV5BZDdhMTAwMmQtOTVlYi00OTcwLTllZGMtMjc4NGU0NzFhODM3XkEyXkFqcGc@._V1_SX300.jpg	7.7	2024-12-03 09:55:25.44	0
16	Toy Story 	-	1995	A little boy named Andy loves to be in his room, playing with his toys, especially his doll named "Woody". But, what do the toys do when Andy is not with them, they come to life. Woody believes that his life (as a toy) is good. However, he must worry about Andy's family moving, and what Woody does not know is about Andy's birthday party. Woody does not realize that Andy's mother gave him an action figure known as Buzz Lightyear, who does not believe that he is a toy, and quickly becomes Andy's new favorite toy. Woody, who is now consumed with jealousy, tries to get rid of Buzz. Then, both Woody and Buzz are now lost. They must find a way to get back to Andy before he moves without them, but they will have to pass through a ruthless toy killer, Sid Phillips.	Disney+, Prime Video	https://www.youtube.com/watch?v=v-PjgYDrg70	2024-12-03 09:55:25.482	1	81	https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg	8.3	2024-12-03 09:55:25.44	0
17	Toy Story 2	-	1999	While Andy is away at summer camp Woody has been toynapped by Al McWiggin, a greedy collector and proprietor of "Al's Toy Barn". In this all-out rescue mission, Buzz and his friends Mr. Potato Head, Slinky Dog, Rex and Hamm spring into action to rescue Woody from winding up as a museum piece. They must find a way to save him before he gets sold in Japan forever and they'll never see him again.	Disney+, Prime Video	https://www.imdb.com/video/vi2052129305/?ref_=tt_vi_i_1	2024-12-03 09:55:25.482	1	92	https://m.media-amazon.com/images/M/MV5BMWM5ZDcxMTYtNTEyNS00MDRkLWI3YTItNThmMGExMWY4NDIwXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg	7.9	2024-12-03 09:55:25.44	0
18	Toy Story 3	-	2010	Woody, Buzz and the whole gang are back. As their owner Andy prepares to depart for college, his loyal toys find themselves in daycare where untamed tots with their sticky little fingers do not play nice. So, it's all for one and one for all as they join Barbie's counterpart Ken, a thespian hedgehog named Mr. Pricklepants and a pink, strawberry-scented teddy bear called Lots-o'-Huggin' Bear to plan their great escape.	Disney+, Prime Video	https://www.imdb.com/video/vi3676898329/?playlistId=tt0435761&ref_=tt_ov_vi	2024-12-03 09:55:25.482	1	103	https://m.media-amazon.com/images/M/MV5BMTgxOTY4Mjc0MF5BMl5BanBnXkFtZTcwNTA4MDQyMw@@._V1_SX300.jpg	8.3	2024-12-03 09:55:25.44	0
19	Toy Story 4	-	2019	Woody, Buzz Lightyear and the rest of the gang embark on a road trip with Bonnie and a new toy named Forky. The adventurous journey turns into an unexpected reunion as Woody's slight detour leads him to his long-lost friend Bo Peep. As Woody and Bo discuss the old days, they soon start to realize that they're two worlds apart when it comes to what they want from life as a toy.	Disney+, Prime Video	https://www.imdb.com/video/vi1497349145/?playlistId=tt1979376&ref_=tt_pr_ov_vi	2024-12-03 09:55:25.482	1	100	https://m.media-amazon.com/images/M/MV5BMTYzMDM4NzkxOV5BMl5BanBnXkFtZTgwNzM1Mzg2NzM@._V1_SX300.jpg	7.7	2024-12-03 09:55:25.44	0
20	UP	-	2009	As a boy, Carl Fredricksen wanted to explore South America and find the forbidden Paradise Falls. About 64 years later he gets to begin his journey along with Boy Scout Russell by lifting his house with thousands of balloons. On their journey, they make many new friends including a talking dog, and figure out that someone has evil plans. Carl soon realizes that this evildoer is his childhood idol.	Disney+, Prime Video	https://www.youtube.com/watch?v=ORFWdXl_zJ4	2024-12-03 09:55:25.482	1	96	https://m.media-amazon.com/images/M/MV5BYjBkM2RjMzItM2M3Ni00N2NjLWE3NzMtMGY4MzE4MDAzMTRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg	8.3	2024-12-03 09:55:25.44	0
21	Cars 	-	2006	While traveling to California for the dispute of the final race of the Piston Cup against The King and Chick Hicks, the famous Lightning McQueen accidentally damages the road of the small town Radiator Springs and is sentenced to repair it. Lightning McQueen has to work hard and finds friendship and love in the simple locals, changing its values during his stay in the small town and becoming a true winner.	Netflix	https://youtu.be/WGByijP0Leo	2024-12-03 09:55:25.482	1	114	https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg	7.2	2024-12-03 09:55:25.44	0
22	Cars 2	-	2011	The famous race car Lightning McQueen and his team are invited to compete in the World Grand Prix race. There, McQueen's best friend Mater finds himself involved in international espionage, and alongside two professional British spies attempts to uncover a secret plan led by a mysterious mastermind and his criminal gang, which threatens the lives of all competitors in the tournament.	Netflix	https://youtu.be/WGByijP0Leo	2024-12-03 09:55:25.482	1	106	https://m.media-amazon.com/images/M/MV5BMTUzNTc3MTU3M15BMl5BanBnXkFtZTcwMzIxNTc3NA@@._V1_SX300.jpg	6.2	2024-12-03 09:55:25.44	0
23	Cars 3	-	2017	Blindsided by a new generation of blazing-fast racers, the legendary Lightning McQueen is suddenly pushed out of the sport he loves. To get back in the game, he will need the help of an eager young race technician with her own plan to win, inspiration from the late Fabulous Hudson Hornet, and a few unexpected turns. Proving that #95 isn't through yet will test the heart of a champion on Piston Cup Racing's biggest stage!	Netflix	https://youtu.be/2LeOH9AGJQM	2024-12-03 09:55:25.482	1	102	https://m.media-amazon.com/images/M/MV5BMTc0NzU2OTYyN15BMl5BanBnXkFtZTgwMTkwOTg2MTI@._V1_SX300.jpg	6.7	2024-12-03 09:55:25.44	0
24	Frozen 	-	2013	Fearless optimist Anna teams up with rugged mountain man Kristoff and his loyal reindeer Sven and sets off on an epic journey to find her sister Elsa, whose icy powers have trapped the kingdom of Arendelle in eternal winter. Encountering Everest-like conditions, mystical trolls and a hilarious snowman named Olaf, Anna and Kristoff battle the elements in a race to save the kingdom. From the outside Elsa looks poised, regal and reserved, but in reality she lives in fear as she wrestles with a mighty secret: she was born with the power to create ice and snow. It's a beautiful ability, but also extremely dangerous. Haunted by the moment her magic nearly killed her younger sister Anna, Elsa has isolated herself, spending every waking minute trying to suppress her growing powers. Her mounting emotions trigger the magic, accidentally setting off an eternal winter that she can't stop. She fears she's becoming a monster and that no one, not even her sister, can help her	Netflix	https://youtu.be/DSgMD4ofCmo	2024-12-03 09:55:25.482	1	104	https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg	7.4	2024-12-03 09:55:25.44	0
25	Frozen 2	-	2019	Having harnessed her ever-growing power after lifting the dreadful curse of eternal winter in Frozen (2013), Queen Elsa, the grand conjurer of snow and ice, and her sister, Princess Anna, now enjoy a happy life in the peaceful kingdom of Arendelle. However, a melodious, insistent voice only Elsa can hear keeps her awake, inviting the Snow Queen to a fabled mystical forest. As a result, unable to block the thrilling call of the secret siren, Elsa follows the voice into the perpetually misty realm in the woods to find answers. But, more and more, an inexplicable imbalance hurts her kingdom and the neighboring tribe of Northuldra. Is Queen Elsa's legendary magic enough to restore peace and stability?	Netflix	https://youtu.be/bwzLiQZDw2I	2024-12-03 09:55:25.482	1	103	https://m.media-amazon.com/images/M/MV5BYmQ5ZWE0ZWUtNzY0Zi00MmZhLWIzNTgtNDk1MTBiMDNmMmZjXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg	6.8	2024-12-03 09:55:25.44	0
26	Blade Runner 2049	Literally me	2017	Thirty years after the events of Blade Runner (1982), a new Blade Runner, L.A.P.D. Officer "K" (Ryan Gosling), unearths a long-buried secret that has the potential to plunge what's left of society into chaos. K's discovery leads him on a quest to find Rick Deckard (Harrison Ford), a former L.A.P.D. Blade Runner, who has been missing for thirty years.	Netflix, Prime Video, Vidio	https://www.imdb.com/video/vi2181676825/?playlistId=tt1856101&ref_=tt_ov_vi	2024-12-03 09:55:25.482	1	164	https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg	8	2024-12-03 09:55:25.44	0
27	Harry Potter and the Sorcerer's Stone	-	2001	An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.	Amazon Prime Video, Netflix, Google Play Movies	https://www.imdb.com/video/vi3115057433/?playlistId=tt0241527&ref_=tt_ov_vi	2024-12-03 09:55:25.482	5	152	https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDRhOC00MGQzLTk5MTAtZDliODg5NmU5MjZhXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg	7.6	2024-12-03 09:55:25.44	0
28	Harry Potter and The Chamber of Secrets	-	2002	Harry Potter lives his second year at Hogwarts with Ron and Hermione when a message on the wall announces that the legendary Chamber of Secrets has been opened. The trio soon realize that, to save the school, it will take a lot of courage.	Amazon Prime Video, Netflix, Google Play Movies	https://www.imdb.com/video/vi1705771289/?playlistId=tt0295297&ref_=tt_ov_vi	2024-12-03 09:55:25.482	5	161	https://m.media-amazon.com/images/M/MV5BMjE0YjUzNDUtMjc5OS00MTU3LTgxMmUtODhkOThkMzdjNWI4XkEyXkFqcGdeQXVyMTA3MzQ4MTc0._V1_SX300.jpg	7.4	2024-12-03 09:55:25.44	0
29	Fate/stay night [Heaven's Feel] I. presage flower	Gekijouban Fate/stay night [Heaven's Feel] I. presage flower	2017	Shirou Emiya is a young mage who attends Homurahara Academy in Fuyuki City. One day after cleaning the Archery Dojo in his school, he catches a glimpse of a fight between superhuman beings, and he gets involved in the Holy Grail War, a ritual where mages called Masters fight each other with their Servants in order to win the Holy Grail. Shirou joins the battle to stop an evildoer from winning the Grail and to save innocent people, but everything goes wrong when a mysterious "Shadow" begins to indiscriminately kill people in Fuyuki.	Crunchyroll, Apple TV, Microsoft Store	https://youtu.be/AMr5pXzpvP0?si=Wrqrp_iXyxIG4dw5	2024-12-03 09:55:25.482	4	120	https://m.media-amazon.com/images/M/MV5BMzFjODA2Y2YtN2RiOS00OWZmLTk5NzEtOTgyZDlmYzFjZWU5XkEyXkFqcGc@._V1_SX300.jpg	7.4	2024-12-03 09:55:25.44	0
30	Fate/stay night [Heaven's Feel] II. lost butterfly	Gekijouban Fate/stay night [Heaven's Feel] II. lost butterfly	2019	The story focuses on the Holy Grail War and explores the relationship between Shirou Emiya and Sakura Matou, two teenagers participating in this conflict. The story continues immediately from Fate/stay night: Heaven's Feel I. presage flower, following Shirou as he continues to participate in the Holy Grail War even after being eliminated as a master.	Apple TV, Microsoft Store	https://youtu.be/nfzKXkL_i54?si=zm6E1OQ54bidiUnf	2024-12-03 09:55:25.482	4	117	https://m.media-amazon.com/images/M/MV5BZjM0ZmIwNjEtNDE4YS00MDQ2LWI2ZTMtYTNkZmMwN2YyZmMwXkEyXkFqcGdeQXVyNzEyMDQ1MDA@._V1_SX300.jpg	7.9	2024-12-03 09:55:25.44	0
31	Fate/stay night [Heaven's Feel] III. spring song	Gekijouban Fate/stay night [Heaven's Feel] III. spring song	2020	The final chapter in the Heaven's Feel trilogy. Angra Mainyu has successfully possessed his vessel Sakura Matou. It's up to Rin, Shirou, and Rider to cleanse the grail or it will be the end of the world and magecraft as we all know it.	Apple TV, Microsoft Store Google Play Movies	https://youtu.be/KlJIMiZfxCY?si=0Lxh1O7xkwxIXi5d	2024-12-03 09:55:25.482	4	120	https://m.media-amazon.com/images/M/MV5BYTg3MmY5MzMtNTdjYS00ZWU2LWI2ODUtOGRmZDRkMzk3MjE4XkEyXkFqcGdeQXVyMTIzNDg4NTk0._V1_SX300.jpg	7.9	2024-12-03 09:55:25.44	0
32	Real Steel	-	2011	In a near future where robot boxing is a top sport, a struggling ex-boxer feels he's found a champion in a discarded robot.	Netflix, Hotstar, Hulu	https://youtu.be/1VFd5FMbZ64?si=ItKqmKxKBM6r4Whv	2024-12-03 09:55:25.482	1	127	https://m.media-amazon.com/images/M/MV5BMjEzMzEzNjg0N15BMl5BanBnXkFtZTcwMzg4NDk0Ng@@._V1_SX300.jpg	7.9	2024-12-03 09:55:25.44	0
33	Dragon Nest: Warriors' Dawn	Long Zhi Gu: Po Xiao Qi Bing	2014	Lambert joins the Dragon Slayers' League to save Altera from the Black Dragon.	Apple TV, Microsoft Store, Google Play Movies	https://youtu.be/0ak7gLnPZfw?si=ZbnsWQCARu5FjAqm	2024-12-03 09:55:25.482	6	127	https://m.media-amazon.com/images/M/MV5BMTU5NTEwNTg5OF5BMl5BanBnXkFtZTgwMTA4NTc5MTE@._V1_SX300.jpg	7.1	2024-12-03 09:55:25.44	0
34	Spirited Away	Sen to Chihiro no kamikakushi	2001	The fanciful adventures of a ten-year-old girl named Chihiro, who discovers a secret world when she and her family get lost and venture through a hillside tunnel. When her parents undergo a mysterious transformation, Chihiro must fend for herself as she encounters strange spirits, assorted creatures and a grumpy sorceress who seeks to prevent her from returning to the human world	Netflix	Spirited Away | IMDb	2024-12-03 09:55:25.482	4	124	https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg	6.2	2024-12-03 09:55:25.44	0
35	Princess Mononoke	Mononoke-hime	1997	While protecting his village from rampaging boar-god/demon, a confident young warrior, Ashitaka, is stricken by a deadly curse. To save his life, he must journey to the forests of the west. Once there, he's embroiled in a fierce campaign that humans were waging on the forest. The ambitious Lady Eboshi and her loyal clan use their guns against the gods of the forest and a brave young woman, Princess Mononoke, who was raised by a wolf-god. Ashitaka sees the good in both sides and tries to stem the flood of blood. This is met by animosity by both sides as they each see him as supporting the enemy.	Netflix	Princess Mononoke - Official Trailer | IMDb	2024-12-03 09:55:25.482	4	133	https://m.media-amazon.com/images/M/MV5BNjM3NGExNDctYmU0Yy00MTJjLThlNTItMjM4NDBjMGRiMmE5XkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg	8.6	2024-12-03 09:55:25.44	0
36	My Neighbor Totoro	Tonari no Totoro	1988	Excited about reuniting with their ailing mother, close-knit sisters Satsuki and Mei embark on an exciting adventure when they move with their loving professor father to a new house in the verdant countryside of 1950s summer Japan. Now, nothing can stop them. And with mum in the hospital, the girls have all the time in the world to explore nature and the dense adjacent forest, the home of bashful mystical creatures only children can see. Under the clear blue sky's cloudless bliss and the bright yellow sun's promise of a luminous future, nothing can blemish the young sisters' flawless fantasy--not even life's trying times. After all, mother is getting better. Then, one radiant morning, as the shimmering green leaves of the towering camphor trees swayed in the soft morning breeze, the wide-eyed siblings stumbled upon a Totoro. But who is the enchanting visitor? Will the rotund neighbour, with his fluffy fur and mysterious eyes, be the girls' forever friend?	Netflix	My Neighbor Totoro - Official Trailer | IMDb	2024-12-03 09:55:25.482	4	86	https://m.media-amazon.com/images/M/MV5BYWM3MDE3YjEtMzIzZC00ODE5LTgxNTItNmUyMTBkM2M2NmNiXkEyXkFqcGc@._V1_SX300.jpg	8.3	2024-12-03 09:55:25.44	0
37	The Boy and The Heron	Kimitachi wa dou ikiru ka	2023	After losing his mother during the war, young Mahito moves to his family's estate in the countryside. There, a series of mysterious events lead him to a secluded and ancient tower, home to a mischievous gray heron. When Mahito's new stepmother disappears, he follows the gray heron into the tower, and enters a fantastic world shared by the living and the dead. As he embarks on an epic journey with the heron as his guide, Mahito must uncover the secrets of this world, and the truth about himself. Featuring the voices of Christian Bale, Dave Bautista, Gemma Chan, Willem Dafoe, Karen Fukuhara, Mark Hamill, Robert Pattinson and Florence Pugh.	Apple tv	The Boy and the Heron - Official Trailer | IMDb	2024-12-03 09:55:25.482	4	124	https://m.media-amazon.com/images/M/MV5BZjZkNThjNTMtOGU0Ni00ZDliLThmNGUtZmMxNWQ3YzAxZTQ1XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg	8.1	2024-12-03 09:55:25.44	0
38	Howl's Moving Castle	Hauru no ugoku shiro	2004	With her country's peace constantly under threat, Sophie, a lively but unloved milliner, catches the attention of an unexpected defender. But as the wide-eyed damsel in distress crosses paths with handsome Howl, a talented young magician with excess emotional baggage, a fit of jealousy turns the hat maker's world upside down forever. Now, stained by the indelible mark of the wicked Witch of the Waste, Sophie must move mountains to break the pitiless spell, including facing her fears and the mysterious sorcerer. However, has anyone ever set foot in Howl's impenetrable home, a walking wonder powered by a fiery heart, and lived to tell the tale?	Netflix	Howl's Moving Castle - Official Trailer | IMDb	2024-12-03 09:55:25.482	4	119	https://m.media-amazon.com/images/M/MV5BMTY1OTg0MjE3MV5BMl5BanBnXkFtZTcwNTUxMTkyMQ@@._V1_SX300.jpg	7.5	2024-12-03 09:55:25.44	0
39	Ae Dil Hai Mushkil	-	2016	Ayan goes on a quest for true love when Alizeh does not reciprocate his feelings. On his journey, he meets different people who make him realize the power of unrequited love.	Netflix, Amazon Prime, Apple TV	https://www.youtube.com/watch?v=Z_PODraXg4E	2024-12-03 09:55:25.482	7	158	https://m.media-amazon.com/images/M/MV5BOTc3ODMwMWItMjI0NC00YmM1LWIxZmItZDk2NjQ1NzQ1ZTVmXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg	8.2	2024-12-03 09:55:25.44	0
40	Kal Ho Naa Ho	-	2003	Naina's neighbor, Aman, introduces her to optimism, and makes her fall in love. But tragedy stopped him from moving forward. In fact, he encouraged his friend Rohit to seduce her.	Netflix, Amazon Prime, Apple TV	https://www.youtube.com/watch?v=tVMAQAsjsOU	2024-12-03 09:55:25.482	7	186	https://m.media-amazon.com/images/M/MV5BYmVjNDIxODAtNWZiZi00ZDBlLWJmOTUtNDNjMGExNTViMzE1XkEyXkFqcGdeQXVyNTE0MDc0NTM@._V1_SX300.jpg	5.8	2024-12-03 09:55:25.44	0
41	Kabhi Khushi Kabhie Gham	-	2001	Rahul is sad because his father disapproves of his relationship with the poor Anjali, but still marries her and moves to London. 10 years later, Rahul's younger brother wants to reconcile his father and brother.	Netflix, Amazon Prime, Apple TV	https://www.youtube.com/watch?v=7uY1JbWZKPA	2024-12-03 09:55:25.482	7	210	https://m.media-amazon.com/images/M/MV5BOTQ5Nzc3NzAtMzZlMS00ZWJjLWIxMGMtNDU4ZTQ1NmNjMjc5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg	7.9	2024-12-03 09:55:25.44	0
42	Jab Tak Hai Jaan	-	2012	Samar Anand is forced to leave his girlfriend, Khushi (Katrina Kaif). From London, he returns to Kashmir leaving his past behind, and meets Akira, a cheerful woman who works for a television program about wildlife. Will Samar still hope for Khushi or choose to start a new life with Akira?	Amazon Prime, Apple TV	https://www.youtube.com/watch?v=v0UXgoJ9Shg	2024-12-03 09:55:25.482	7	176	https://m.media-amazon.com/images/M/MV5BMTUyMzM5OTM5NF5BMl5BanBnXkFtZTcwNTIwMjA3OA@@._V1_SX300.jpg	7.4	2024-12-03 09:55:25.44	0
43	Bajrangi Bhaijaan	-	2015	Pavan, a devotee of Hanuman, faces various challenges when he tries to reunite Munni with her family after Munni goes missing while traveling back home with her mother.	Disney +, Bstation	https://www.youtube.com/watch?v=4nwAra0mz_Q	2024-12-03 09:55:25.482	7	163	https://m.media-amazon.com/images/M/MV5BYzVjMjZiNGUtZjZiNy00Yzg4LWEzYzYtMmI1NDg5NWNiNjUwXkEyXkFqcGc@._V1_SX300.jpg	6.7	2024-12-03 09:55:25.44	0
44	Transformers: Revenge of the Fallen	-	2009	A youth chooses manhood. The week Sam Witwicky starts college, the Decepticons make trouble in Shanghai. A presidential envoy believes it's because the Autobots are around; he wants them gone. He's wrong: the Decepticons need access to Sam's mind to see some glyphs imprinted there that will lead them to a fragile object that, when inserted in an alien machine hidden in Egypt for centuries, will give them the power to blow out the sun. Sam, his girlfriend Mikaela Banes, and Sam's parents are in danger. Optimus Prime and Bumblebee are Sam's principal protectors. If one of them goes down, what becomes of Sam?	Netflix	https://www.imdb.com/video/vi2982019609/?playlistId=tt1055369&ref_=ext_shr_lnk	2024-12-03 09:55:25.482	1	149	https://m.media-amazon.com/images/M/MV5BNjk4OTczOTk0NF5BMl5BanBnXkFtZTcwNjQ0NzMzMw@@._V1_SX300.jpg	8.1	2024-12-03 09:55:25.44	0
45	Transformers: Dark of the Moon	-	2011	Autobots Bumblebee, Ratchet, Ironhide, Mirage (aka Dino), Wheeljack (aka Que) and Sideswipe led by Optimus Prime, are back in action taking on the evil Decepticons, who are eager to avenge their recent defeat. The Autobots and Decepticons become involved in a perilous space race between the United States and Russia to reach a hidden Cybertronian spacecraft on the moon and learn its secrets, and once again Sam Witwicky has to go to the aid of his robot friends. The new villain Shockwave is on the scene while the Autobots and Decepticons continue to battle it out on Earth.	Netflix	https://www.imdb.com/video/vi543989017/?playlistId=tt1399103&ref_=ext_shr_lnk	2024-12-03 09:55:25.482	1	154	https://m.media-amazon.com/images/M/MV5BMTkwOTY0MTc1NV5BMl5BanBnXkFtZTcwMDQwNjA2NQ@@._V1_SX300.jpg	6	2024-12-03 09:55:25.44	0
46	Transformers: Age of Extinction	-	2014	After the battle between the Autobots and Decepticons that leveled Chicago, humanity thinks that all alien robots are a threat. So Harold Attinger, a CIA agent, establishes a unit whose sole purpose is to hunt down all of them. But it turns out that they are aided by another alien robot who is searching for Optimus Prime. Cade Yeager, a "robotics expert", buys an old truck and upon examining it, he thinks it's a Transformer. When he powers it up, he discovers it's Optimus Prime. Later, men from the unit show up looking for Optimus. He helps Yeager and his daughter Tessa escape but are pursued by the hunter. They escape and Yeager learns from technology he took from the men that a technology magnate and defense contractor named Joshua Joyce is part of what's going on, so they go to find out what's going on.	Netflix	https://www.imdb.com/video/vi3138759961/?playlistId=tt2109248&ref_=ext_shr_lnk	2024-12-03 09:55:25.482	1	165	https://m.media-amazon.com/images/M/MV5BMjEwNTg1MTA5Nl5BMl5BanBnXkFtZTgwOTg2OTM4MTE@._V1_SX300.jpg	6	2024-12-03 09:55:25.44	0
47	Transformers: The Last Knight	-	2017	Having left Earth, Optimus Prime finds his dead home planet, Cybertron, and discovers that he was in fact responsible for its destruction. Optimus learns that he can bring Cybertron back to life, but in order to do so, he will need an artifact that is hidden on Earth.	Netflix	https://www.imdb.com/video/vi4102142233/?playlistId=tt3371366&ref_=ext_shr_lnk	2024-12-03 09:55:25.482	1	154	https://m.media-amazon.com/images/M/MV5BYWNlNjU3ZTItYTY3Mi00YTU1LTk4NjQtYjQ3MjFiNjcyODliXkEyXkFqcGc@._V1_SX300.jpg	6.2	2024-12-03 09:55:25.44	0
48	Transformers: Rise of the Beasts	-	2023	Returning to the action and spectacle that has captivated moviegoers around the world, Transformers: Rise of the Beasts will take audiences on a global '90s adventure with the Autobots and introduce a new faction of Transformers - the Maximals - to join them as allies in the war. the ongoing battle on earth. Directed by Steven Caple Jr. and starring Anthony Ramos and Dominique Fishback	Netflix	https://www.imdb.com/video/vi4232692761/?playlistId=tt5090568&ref_=ext_shr_lnk	2024-12-03 09:55:25.482	1	127	https://m.media-amazon.com/images/M/MV5BZTVkZWY5MmItYjY3OS00OWY3LTg2NWEtOWE1NmQ4NGMwZGNlXkEyXkFqcGc@._V1_SX300.jpg	5.6	2024-12-03 09:55:25.44	0
49	Detective Conan: The Sniper from Another Dimension	Meitantei Conan: Ijigen no Sniper	2014	After participating in the opening ceremony, Conan, Professor Agasa, Ran, Haibara, and the Detective Boys are enjoying the view from the observation deck of the 635-metre tall Bell Tree Tower. Suddenly, a bullet breaks through a window, strikes a man's chest and breaks a TV screen, causing everyone to panic. Conan stays calm and, using the zoom function on his tracking glasses to follow the path of the bullet to its source, spots the sniper. He and Masumi Sera, who had been present at the Tower as part of an assignment to shadow the victim, pursue the fleeing culprit on Masumi's motorcycle, but the chase takes a violent turn when the suspect uses a handgun and even hand grenades to take out his pursuers. Even the FBI get involved in the chase, but the culprit and the mysteries of the sniping end up vanishing into the ocean.	Netflix, Bstation	Detective Conan movie 18 sniper from another dimension full trailer HD - YouTube	2024-12-03 09:55:25.482	4	154	https://m.media-amazon.com/images/M/MV5BN2EzOWEyNDEtYThiMy00OThkLWFhMjAtMmI5OWQ5NDgxYmEzXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg	5.2	2024-12-03 09:55:25.44	0
50	Detective Conan: The Darkest Nightmare	Meitantei Conan: Junkoku no Nightmare\n	2016	A spy infiltrated the Japanese National Police Agency, retrieving secret files of Britain's MI6, Germany's BND and America's CIA and FBI. Rei Furuya and a group of Tokyo Police PSB intercepted the spy during the getaway, and just before the major car accident, FBI Agent Shuichi Akai sniped and crashed the spy's vehicle. The next day, at the aquarium in Tokyo with the Ferris wheel, Conan and the Detective Boys found a woman with heterochromia iris who suffered memory loss and had a broken cell phone. Having decided to stay and help the woman regain her memory, Conan and the Detective Boys are under the watchful eye of Vermouth.\r	Netflix, Bstation	DETECTIVE CONAN: THE DARKEST NIGHTMARE - Official Trailer (In cinemas 7 July) - YouTube	2024-12-03 09:55:25.482	4	112	https://m.media-amazon.com/images/M/MV5BZjViNjZiNjUtMjZhMi00M2UyLWIyOGMtMWNjMWM3NjA1MTVjXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg	6.7	2024-12-03 09:55:25.44	0
51	Detective Conan: Zero The Enforcer	Meitantei Conan: Zero no Shikkounin	2018	Detective Conan investigates an explosion that occurs on the opening day of a large Tokyo resort and convention center.\r\n\r	Netflix, Bstation	DETECTIVE CONAN: ZERO THE ENFORCER Official Indonesia Trailer - YouTube	2024-12-03 09:55:25.482	4	115	https://m.media-amazon.com/images/M/MV5BNjMzMDA3MDYtNTNlMS00YTc3LTlkYmItYjViMjZjY2U1YzNmXkEyXkFqcGdeQXVyMjY2OTU0MTg@._V1_SX300.jpg	7	2024-12-03 09:55:25.44	0
52	Detective Conan :The Lost Ship in the Sky\n\n	Meitantei Conan: Tenkuu no rosuto shippu	2010	Kid has his eyes set on the "Lady of the Sky" jewel aboard Bell 3, the largest airship in the world. However, a mysterious terrorist group called Red Shamu-neko has hijacked the airship, along with Conan and his allies Kogoro and Ran.\n	Netflix, Bstation	Detective Conan Movie 14 _ Lost Ship In The Sky OFFICIAL TRAILER - YouTube	2024-12-03 09:55:25.482	4	103	https://m.media-amazon.com/images/M/MV5BZWIxOGQxZTAtMjE1NC00MzBmLTk2YWQtMTUwYTA3YzI5ZDQ5XkEyXkFqcGc@._V1_SX300.jpg	6.9	2024-12-03 09:55:25.44	0
53	Detective Conan: Sunflowers of Inferno	Meitantei Conan: Gouka no Himawari\n	2015	Conan and his friends must prevent Kid from stealing a famous painting.\r\n\r	Netflix, Bstation	Detective Conan: Sunflowers of Inferno Official Trailer - YouTube	2024-12-03 09:55:25.482	4	112	https://m.media-amazon.com/images/M/MV5BZWZiYjIzOTEtZDgyZS00OGRiLWE3ZDQtZWEwN2I4MDc3ODc4XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg	6.2	2024-12-03 09:55:25.44	0
54	Pacific Rim	-	2013	Long ago, legions of monstrous creatures called Kaiju arose from the sea, bringing with them all-consuming war. To fight the Kaiju, mankind developed giant robots called Jaegers, designed to be piloted by two humans locked together in a neural bridge. However, even the Jaegers are not enough to defeat the Kaiju, and humanity is on the verge of defeat. Mankind's last hope now lies with a washed-up ex-pilot, an untested trainee and an old, obsolete Jaeger.	Netflix	https://www.imdb.com/video/vi1369752345/?playlistId=tt1663662&ref_=ext_shr_lnk	2024-12-03 09:55:25.482	1	131	https://m.media-amazon.com/images/M/MV5BMTY3MTI5NjQ4Nl5BMl5BanBnXkFtZTcwOTU1OTU0OQ@@._V1_SX300.jpg	7	2024-12-03 09:55:25.44	0
55	Pacific Rim: Uprising	-	2018	Jake Pentecost is a once-promising Jaeger pilot whose legendary father gave his life to secure humanity's victory against the monstrous Kaiju. Jake has since abandoned his training only to become caught up in a criminal underworld. But when an even more unstoppable threat is unleashed to tear through cities and bring the world to its knees, Jake is given one last chance by his estranged sister, Mako Mori, to live up to his father's legacy.	Netflix	https://www.imdb.com/video/vi2501425177/?playlistId=tt2557478&ref_=ext_shr_lnk	2024-12-03 09:55:25.482	1	111	https://m.media-amazon.com/images/M/MV5BMjI3Nzg0MTM5NF5BMl5BanBnXkFtZTgwOTE2MTgwNTM@._V1_SX300.jpg	5.6	2024-12-03 09:55:25.44	0
56	The Da Vinci Code	-	2006	A murder in Paris' Louvre Museum and cryptic clues in some of Leonardo da Vinci's most famous paintings lead to the discovery of a religious mystery. For 2,000 years a secret society closely guards information that -- should it come to light -- could rock the very foundations of Christianity.	Netflix	https://www.imdb.com/video/vi2369847833/?playlistId=tt0382625&ref_=ext_shr_lnk	2024-12-03 09:55:25.482	1	149	https://m.media-amazon.com/images/M/MV5BMjIxMjQyMTc3Nl5BMl5BanBnXkFtZTcwMTA1MDUzMw@@._V1_SX300.jpg	6.6	2024-12-03 09:55:25.44	0
57	Inferno	-	2016	Famous symbologist Robert Langdon (Tom Hanks) follows a trail of clues tied to Dante, the great medieval poet. When Langdon wakes up in an Italian hospital with amnesia, he teams up with Sienna Brooks (Felicity Jones), a doctor he hopes will help him recover his memories. Together, they race across Europe and against the clock to stop a madman (Ben Foster) from unleashing a virus that could wipe out half of the world's population.	Netflix	https://www.imdb.com/video/vi396539673/?playlistId=tt3062096&ref_=ext_shr_lnk	2024-12-03 09:55:25.482	1	121	https://m.media-amazon.com/images/M/MV5BMTUzNTE2NTkzMV5BMl5BanBnXkFtZTgwMDAzOTUyMDI@._V1_SX300.jpg	6.2	2024-12-03 09:55:25.44	0
58	6 Underground	-	2019	Six individuals from all around the globe, each the very best at what they do, have been chosen not only for their skill, but for a unique desire to delete their pasts to change the future.	Netflix	https://www.imdb.com/video/vi2200092441/?playlistId=tt8106534&ref_=ext_shr_lnk	2024-12-03 09:55:25.482	1	128	https://m.media-amazon.com/images/M/MV5BNzE2ZjQxNjEtNmI2ZS00ZmU0LTg4M2YtYzVhYmRiYWU0YzI1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg	6.1	2024-12-03 09:55:25.44	0
60	Chernobyl: Abyss	-	2021	A story about a heroic fireman who worked as one of Chernobyl liquidators.	Netflix	https://www.youtube.com/watch?v=G8xJb6-ZNKM	2024-12-03 09:55:25.482	9	136	https://m.media-amazon.com/images/M/MV5BMDE3ODIzMTgtOWM0My00NzI0LTliMTUtMzUxMGNhZTgxZDIzXkEyXkFqcGdeQXVyNjcxMTIwNzU@._V1_SX300.jpg	5.2	2024-12-03 09:55:25.44	0
61	Downfall	Der Untergang	2004	Traudl Junge, the final secretary for Adolf Hitler, tells of the Nazi dictator's final days in his Berlin bunker at the end of WWII.	Amazon Prime 	https://www.youtube.com/watch?v=htvYfe6wz_8	2024-12-03 09:55:25.482	10	156	https://m.media-amazon.com/images/M/MV5BMTU0NTU5NTAyMl5BMl5BanBnXkFtZTYwNzYwMDg2._V1_SX300.jpg	8.2	2024-12-03 09:55:25.44	0
\.


--
-- Data for Name: DramaToGenres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."DramaToGenres" ("dramaId", "genreId") FROM stdin;
1	19
1	15
1	12
1	33
2	19
2	20
2	12
2	33
3	19
3	20
3	12
3	33
4	19
4	20
4	15
4	12
5	19
5	20
5	12
5	33
6	19
6	28
6	29
6	12
7	17
7	15
7	33
8	25
8	17
8	2
9	14
9	17
9	15
9	33
10	17
10	12
10	33
11	2
11	17
11	22
11	25
12	19
12	17
12	23
12	14
12	25
13	12
13	5
13	32
13	15
13	17
14	24
14	19
14	12
14	15
14	33
15	12
15	17
15	20
15	19
16	4
16	20
16	25
16	7
16	31
17	4
17	20
17	25
17	7
17	31
18	4
18	20
18	25
18	7
18	31
19	4
19	20
19	25
19	7
19	31
20	4
20	20
20	25
20	7
20	31
21	4
21	20
21	25
21	7
21	1
22	4
22	20
22	25
22	7
22	1
23	4
23	20
23	25
23	7
23	1
24	4
24	20
24	25
24	7
24	10
24	16
25	4
25	20
25	25
25	7
25	10
25	16
26	13
26	19
26	17
26	27
27	20
27	7
27	10
28	20
28	7
28	10
28	15
29	21
29	19
29	20
29	17
29	10
30	21
30	19
30	20
30	17
30	10
31	21
31	19
31	20
31	17
31	10
32	11
32	19
32	17
32	12
32	1
33	19
33	20
33	4
33	10
33	7
34	21
34	10
34	20
34	26
34	17
35	21
35	10
35	20
35	19
35	17
35	2
36	21
36	10
36	20
36	7
36	26
37	21
37	10
37	20
37	26
38	21
38	10
38	20
38	26
38	17
38	2
39	2
39	16
40	2
40	16
40	25
41	17
41	16
41	7
42	2
42	17
43	8
43	17
43	7
44	19
44	20
44	12
45	19
45	20
45	12
46	19
46	20
46	12
47	19
47	20
47	12
48	19
48	20
48	12
49	19
49	20
49	14
49	15
49	4
50	19
50	20
50	14
50	15
50	4
51	19
51	20
51	14
51	15
51	4
52	19
52	20
52	14
52	15
52	4
53	19
53	20
53	14
53	15
53	4
54	3
54	19
54	20
54	30
55	3
55	19
55	20
55	30
56	9
56	6
56	15
56	33
57	19
57	20
57	14
57	17
57	15
58	19
58	33
59	19
59	20
59	12
59	33
60	17
60	18
61	17
61	18
\.


--
-- Data for Name: Genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Genre" (id, name) FROM stdin;
1	Sport
2	Romance
3	Kaiju
4	Animation
5	Dark Fantasy
6	Suspense Mystery
7	Family
8	Advanture
9	Globerotting Adventure
10	Fantasy
11	Boxing
12	Sci-Fi
13	Cyberpunk
14	Crime
15	Mystery
16	Musical
17	Drama
18	History
19	Action
20	Adventure
21	Anime
22	Coming of Age
23	Heist
24	Survival
25	Comedy
26	Super-natural
27	Mistery
28	Dark Comedy
29	Superhero
30	Sci-fi
31	Fantasy.
32	Horror
33	Thriller
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Review" (id, content, rating, "createdAt", "dramaId", "userId", author, status) FROM stdin;
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, username, email, role, password) FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
\.


--
-- Name: Actor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Actor_id_seq"', 316, true);


--
-- Name: Award_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Award_id_seq"', 51, true);


--
-- Name: Country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Country_id_seq"', 10, true);


--
-- Name: Drama_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Drama_id_seq"', 61, true);


--
-- Name: Genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Genre_id_seq"', 33, true);


--
-- Name: Review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Review_id_seq"', 1, false);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 1, false);


--
-- Name: ActorToDrama ActorToDrama_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ActorToDrama"
    ADD CONSTRAINT "ActorToDrama_pkey" PRIMARY KEY ("actorId", "dramaId");


--
-- Name: Actor Actor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Actor"
    ADD CONSTRAINT "Actor_pkey" PRIMARY KEY (id);


--
-- Name: AwardToCountry AwardToCountry_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AwardToCountry"
    ADD CONSTRAINT "AwardToCountry_pkey" PRIMARY KEY ("awardId", "countryId");


--
-- Name: Award Award_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Award"
    ADD CONSTRAINT "Award_pkey" PRIMARY KEY (id);


--
-- Name: Country Country_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Country"
    ADD CONSTRAINT "Country_pkey" PRIMARY KEY (id);


--
-- Name: DramaToGenres DramaToGenres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DramaToGenres"
    ADD CONSTRAINT "DramaToGenres_pkey" PRIMARY KEY ("dramaId", "genreId");


--
-- Name: Drama Drama_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Drama"
    ADD CONSTRAINT "Drama_pkey" PRIMARY KEY (id);


--
-- Name: Genre Genre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Genre"
    ADD CONSTRAINT "Genre_pkey" PRIMARY KEY (id);


--
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Award_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Award_name_key" ON public."Award" USING btree (name);


--
-- Name: Country_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Country_name_key" ON public."Country" USING btree (name);


--
-- Name: Genre_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Genre_name_key" ON public."Genre" USING btree (name);


--
-- Name: Users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Users_email_key" ON public."Users" USING btree (email);


--
-- Name: Users_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Users_username_key" ON public."Users" USING btree (username);


--
-- Name: ActorToDrama ActorToDrama_actorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ActorToDrama"
    ADD CONSTRAINT "ActorToDrama_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES public."Actor"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ActorToDrama ActorToDrama_dramaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ActorToDrama"
    ADD CONSTRAINT "ActorToDrama_dramaId_fkey" FOREIGN KEY ("dramaId") REFERENCES public."Drama"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Actor Actor_countryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Actor"
    ADD CONSTRAINT "Actor_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES public."Country"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AwardToCountry AwardToCountry_awardId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AwardToCountry"
    ADD CONSTRAINT "AwardToCountry_awardId_fkey" FOREIGN KEY ("awardId") REFERENCES public."Award"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AwardToCountry AwardToCountry_countryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AwardToCountry"
    ADD CONSTRAINT "AwardToCountry_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES public."Country"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Award Award_dramaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Award"
    ADD CONSTRAINT "Award_dramaId_fkey" FOREIGN KEY ("dramaId") REFERENCES public."Drama"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: DramaToGenres DramaToGenres_dramaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DramaToGenres"
    ADD CONSTRAINT "DramaToGenres_dramaId_fkey" FOREIGN KEY ("dramaId") REFERENCES public."Drama"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: DramaToGenres DramaToGenres_genreId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DramaToGenres"
    ADD CONSTRAINT "DramaToGenres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES public."Genre"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Drama Drama_countryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Drama"
    ADD CONSTRAINT "Drama_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES public."Country"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Review Review_dramaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_dramaId_fkey" FOREIGN KEY ("dramaId") REFERENCES public."Drama"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Review Review_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

