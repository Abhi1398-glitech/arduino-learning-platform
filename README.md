# Arduino Learning Platform – Project Requirements Document

## 1. Project Overview

The Arduino Learning Platform is a web-based educational application designed to help beginners learn Arduino programming through a structured, hands-on approach. The platform combines **video lessons, theory explanations, code writing, and automated test cases** to provide an interactive learning experience.

This document defines the **functional and non-functional requirements** for the initial prototype and sets a foundation for future expansion.

---

## 2. Goals and Objectives

### Primary Goals

* Enable users to **learn Arduino programming interactively**
* Allow users to **write Arduino code in the browser**
* Compile Arduino code on the backend using **Arduino CLI**
* Automatically **evaluate code using test cases**
* Provide clear feedback on correctness

### Secondary Goals

* Modular course structure for future scalability
* Clean and beginner-friendly UI
* Separation of frontend and backend responsibilities

---

## 3. Target Audience

* Beginners learning Arduino
* Students in electronics / embedded systems
* Hobbyists and self-learners

---

## 4. System Architecture (High-Level)

### Frontend

* Built using **React (CRA)**
* Single Page Application (SPA)
* Communicates with backend via HTTP (REST API)

### Backend

* Built using **Node.js + Express**
* Uses **Arduino CLI** to compile Arduino sketches
* Executes test case validation logic

### Deployment (Planned)

* Frontend: Static hosting (Vercel / Firebase)
* Backend: Linux server or Docker container

---

## 5. Frontend Requirements

### 5.1 Global Layout

#### Navbar (Persistent)

The navigation bar must contain the following links:

* **Home**
* **Courses**
* **Settings**
* **Contact Us**

The navbar should be visible on all pages.

---

### 5.2 Home Page

#### Sections

1. **Goal Section**

   * Brief description of the platform’s mission
   * Focus on hands-on Arduino learning

2. **Courses Overview Section**

   * Displays available courses
   * For prototype: only **one course** is shown

---

### 5.3 Courses Page

#### Course Listing

* Displays available courses as cards
* Prototype includes **one Arduino course**

Example:

* "Arduino Basics – LED Blinking"

---

### 5.4 Course Detail Page (Prototype Scope)

Each course consists of **3–4 parts (modules)**.

#### Course Modules

1. **Video Module**

   * Embedded video player (YouTube or hosted video)
   * Explains the concept visually

2. **Theory Module**

   * Text-based explanation of concepts
   * Includes code snippets and diagrams if needed

3. **Code & Test Cases Module**

   * Code editor (textarea or Monaco editor)
   * User writes Arduino code
   * "Compile / Run" button
   * Displays:

     * Compilation result
     * Test case pass/fail status
---

### 5.5 Code Editor Requirements

* Accepts Arduino `.ino` code
* Pre-filled starter code
* Monospace font
* Readable error output

---

### 5.6 Test Case Display

* List of test cases shown below editor
* Each test case displays:

  * Description
  * Status (Pass / Fail)

Example:

*  Uses `pinMode(LED_BUILTIN, OUTPUT)`
*  Toggles LED HIGH and LOW
*  Missing delay()

---

## 6. Backend Requirements

### 6.1 API Endpoints

#### POST `/compile`

### 6.2 Compilation Engine

* Use **Arduino CLI**
* Target board: `arduino:avr:uno`
* Compile code in an isolated directory

---

### 6.3 Test Case Engine (Prototype)

Test cases are rule-based checks such as:

* Presence of required functions (`setup`, `loop`)
* Usage of specific APIs (`pinMode`, `digitalWrite`)
* Correct pin usage (`LED_BUILTIN`)

Test results must be returned as structured JSON.

---

## 7. Non-Functional Requirements

### Performance

* Compilation response within reasonable time (< 5s)

### Security

* Limit compilation frequency (rate limiting)
* No arbitrary file system access
* Sanitize user input

### Scalability (Future)

* Support multiple courses
* Support multiple boards
* User authentication
* Progress tracking

---

## 8. Prototype Scope (What WILL be built now)

✔ Single-page React application
✔ Navbar with Home, Courses, Settings, Contact
✔ One Arduino course
✔ 3–4 course modules
✔ Arduino code compilation via backend
✔ Basic test case validation

---

## 9. Out of Scope (For Future Versions)

* User login / authentication
* Certificates
* Multi-board support
* Real hardware simulation

---

## 10. Success Criteria

The prototype is considered successful if:

* Users can write Arduino code in the browser
* Code is compiled on the backend
* Test cases execute and results are shown clearly
* UI flow matches defined course structure

---

**Document Version**: 1.0
**Status**: Prototype Phase
