-- Enable UUID generation (if not already enabled)
create extension if not exists "uuid-ossp";

-- Create table to store design feedback
create table public.design_feedback (
    id uuid primary key default uuid_generate_v4(),

    name text not null,
    department text not null,

    preferred_color text not null
        check (preferred_color in ('green', 'purple', 'blue')),

    remark text, -- Optional user remark / comment

    viewed_green boolean not null default false,
    viewed_purple boolean not null default false,
    viewed_blue boolean not null default false,

    created_at timestamp with time zone not null default now()
);

-- Optional index for faster sorting and reporting
create index design_feedback_created_at_idx
on public.design_feedback (created_at desc);
