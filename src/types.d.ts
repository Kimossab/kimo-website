interface LunaPictures {
  original: string;
  thumbnail: string;
  name: string;
}

interface KimoState {
  darkMode: boolean;
  lunaPictures: LunaPictures[];
  lunaSelected: number | null;
  lunaLoading: boolean;
}

interface APIReply<S> {
  status: number;
  data: S;
}

type APILunaList = APIReply<string[]>;
