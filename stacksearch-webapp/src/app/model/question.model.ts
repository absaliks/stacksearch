export interface Question {
  title: string;
  link: string;
  owner: Owner;
  creation_date: string;
}

export interface Owner {
  display_name: string;
}
