-- Create the users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    password TEXT NOT NULL
);

-- Create the courses table
CREATE TABLE courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    credits INTEGER NOT NULL DEFAULT 5,
    user_id INTEGER NOT NULL DEFAULT 1,
    status TEXT CHECK (status IN ('not started', 'in progress', 'done')) NOT NULL DEFAULT 'not started',
    notes TEXT,
    start_date DATE,
    end_date DATE,
    responsible_teacher TEXT,
    location TEXT,
    course_link TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create the assignments table
CREATE TABLE assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    type TEXT CHECK (type IN ('exam', 'report')) NOT NULL,
    is_group BOOLEAN,
    deadline DATE,
    is_obligatory BOOLEAN,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Create the lectures table
CREATE TABLE lectures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    date DATE,
    start_time TEXT,
    end_time TEXT,
    location TEXT,
    is_obligatory BOOLEAN,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);
