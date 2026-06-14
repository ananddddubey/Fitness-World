import { Exercise, WorkoutDay, UserProfile } from './types';

export const EXERCISES: Exercise[] = [
  // STRENGTH
  {
    id: 's1',
    name: 'Barbell Squat',
    muscleGroup: 'Quads & Glutes',
    sets: 5,
    reps: '5 reps',
    rest: '120s',
    targetGoal: 'strength',
    videoUrlPlaceholder: 'uq4-yE-q3E8', // Mock YouTube IDs or just visual indicators
    defaultTips: [
      'Keep your chest up and core braced throughout the lift.',
      'Sinking hips below your knees ensuring a full range of motion.',
      'Drive heavy through your mid-foot to stand back up.'
    ]
  },
  {
    id: 's2',
    name: 'Deadlift',
    muscleGroup: 'Hamstrings & Back',
    sets: 4,
    reps: '5 reps',
    rest: '150s',
    targetGoal: 'strength',
    videoUrlPlaceholder: 'ytK1ZIs-zXU',
    defaultTips: [
      'Maintain a neutral spine; do not let your lower back round.',
      'Keep the bar micro-close to your shins throughout the vertical pull.',
      'Engage your lats to lock the bar back before initiating the pull.'
    ]
  },
  {
    id: 's3',
    name: 'Bench Press',
    muscleGroup: 'Chest, Shoulders & Triceps',
    sets: 4,
    reps: '8 reps',
    rest: '90s',
    targetGoal: 'strength',
    videoUrlPlaceholder: 'gRVjAtPip0Y',
    defaultTips: [
      'Keep your shoulder blades retracted and firmly planted on the bench.',
      'Touch the bar to your lower sternum with controlled speed.',
      'Press up firmly and lock out elbows safely.'
    ]
  },
  {
    id: 's4',
    name: 'Pull-Ups',
    muscleGroup: 'Back & Biceps',
    sets: 4,
    reps: '8 reps',
    rest: '90s',
    targetGoal: 'strength',
    videoUrlPlaceholder: 'eGo4IYRupX8',
    defaultTips: [
      'Pull your elbows straight down to your back pockets.',
      'Control the descent; do not drop like a stone.',
      'Engage your shoulder blades before pulling your body up.'
    ]
  },
  {
    id: 's5',
    name: 'Romanian Deadlift',
    muscleGroup: 'Hamstrings & Glutes',
    sets: 3,
    reps: '10 reps',
    rest: '90s',
    targetGoal: 'strength',
    videoUrlPlaceholder: 'hCDzSR6bW10',
    defaultTips: [
      'Push your hips far back and hinge at the hips instead of bending your knees.',
      'Keep a slight bend in your knees (do not lock them completely).',
      'Lower the weights until you feel a deep stretch in your hamstrings, then squeeze your glutes on the way up.'
    ]
  },

  // FAT LOSS
  {
    id: 'f1',
    name: 'Kettlebell Swing',
    muscleGroup: 'Glutes, Hamstrings & Core',
    sets: 4,
    reps: '20 reps',
    rest: '60s',
    targetGoal: 'fat-loss',
    videoUrlPlaceholder: 'KDBosfGQ3Tk',
    defaultTips: [
      'Hinge at your hips, do not squat. Think back and forward.',
      'Snap your hips forward with power to drive the kettlebell to shoulder height.',
      'Keep your core locked and spine neutral with no arching back at the top.'
    ]
  },
  {
    id: 'f2',
    name: 'Box Jump',
    muscleGroup: 'Explosive Quads & Calves',
    sets: 3,
    reps: '12 reps',
    rest: '60s',
    targetGoal: 'fat-loss',
    videoUrlPlaceholder: 'txZ_6fS3I6M',
    defaultTips: [
      'Land softly on the box in a half-squat stance.',
      'Step down one leg at a time; do not jump backwards to avoid knee stress.',
      'Swing your arms dynamically to generate liftoff momentum.'
    ]
  },
  {
    id: 'f3',
    name: 'Battle Ropes',
    muscleGroup: 'Full Body Endurance',
    sets: 4,
    reps: '40s intervals',
    rest: '45s',
    targetGoal: 'fat-loss',
    videoUrlPlaceholder: 'H8Mvsf6g5C8',
    defaultTips: [
      'Assume an athletic half-squat stance to anchor yourself.',
      'Keep waves moving continuously and rapidly.',
      'Incorporate both alternating waves and double-slam motions.'
    ]
  },
  {
    id: 'f4',
    name: 'Mountain Climbers',
    muscleGroup: 'Abdominals & Shoulders',
    sets: 3,
    reps: '30 reps',
    rest: '30s',
    targetGoal: 'fat-loss',
    videoUrlPlaceholder: 'kLh-5ElvIjo',
    defaultTips: [
      'Maintain a strong high-plank position with a flat back.',
      'Drive your knees directly towards your chest as fast as safe.',
      'Keep your hips low and shoulders stacked over your wrists.'
    ]
  },
  {
    id: 'f5',
    name: 'Burpees',
    muscleGroup: 'Cardiovascular & Full Body',
    sets: 3,
    reps: '15 reps',
    rest: '60s',
    targetGoal: 'fat-loss',
    videoUrlPlaceholder: 'dZfeXHI2Vl8',
    defaultTips: [
      'Drop to details immediately; drop your chest fully to the floor.',
      'Jump feet forward wide and stand up in one fluid, continuous motion.',
      'Explode into a jump at the top with hands high above your head.'
    ]
  },

  // ATHLETIC
  {
    id: 'a1',
    name: 'Power Clean',
    muscleGroup: 'Full Body Power & Traps',
    sets: 4,
    reps: '4 reps',
    rest: '120s',
    targetGoal: 'athletic',
    videoUrlPlaceholder: 'KjGvSg-8g5M',
    defaultTips: [
      'Explode upwards with a powerful triple-extension of hips, knees, and ankles.',
      'Pull the bar high and shrug up energetically, catching it on your anterior shoulders.',
      'Keep your elbows up high at the catch position.'
    ]
  },
  {
    id: 'a2',
    name: 'Single-Leg RDL',
    muscleGroup: 'Hamstrings, Glutes & Balance',
    sets: 3,
    reps: '10 reps each',
    rest: '60s',
    targetGoal: 'athletic',
    videoUrlPlaceholder: '0_S6O77sYlA',
    defaultTips: [
      'Hinge forwards, keeping your hips parallel to the ground (do not rotate).',
      'Extend your rear leg back straight as a counterweight.',
      'Squeeze the standing-leg glute to return upright.'
    ]
  },
  {
    id: 'a3',
    name: 'Sprint Intervals',
    muscleGroup: 'Cardiorespiratory & Legs',
    sets: 6,
    reps: '20m sprints',
    rest: '90s',
    targetGoal: 'athletic',
    videoUrlPlaceholder: 'V-N1aRz8rSg',
    defaultTips: [
      'Accelerate hard with powerful strides pumping your arms.',
      'Stay relaxed in your neck and face; maintain tall sprinting form.',
      'Walk back slow and rest fully to sustain supreme speed.'
    ]
  },
  {
    id: 'a4',
    name: 'Lateral Bounds',
    muscleGroup: 'Hips & Lateral Power',
    sets: 3,
    reps: '12 reps total',
    rest: '60s',
    targetGoal: 'athletic',
    videoUrlPlaceholder: '9XlYIuMvU0M',
    defaultTips: [
      'Push off with power to jump horizontally as far as you can control.',
      'Land softly on your single trailing leg, absorbing the force.',
      'Load up immediately to spring back in the opposite direction.'
    ]
  },
  {
    id: 'a5',
    name: 'Medicine Ball Slam',
    muscleGroup: 'Explosive Core & Arms',
    sets: 4,
    reps: '10 reps',
    rest: '60s',
    targetGoal: 'athletic',
    videoUrlPlaceholder: 'Rx_UHMnQljU',
    defaultTips: [
      'Reach up tall, rising high on your tiptoes with the ball overhead.',
      'Hrow your hips back and slam the ball straight into the floor.',
      'Catch the bounce with bent knees to initiate the next rep.'
    ]
  }
];

export const WEEKLY_PROGRAMS: Record<string, WorkoutDay[]> = {
  'Beginners': [
    {
      day: 'Monday',
      title: 'Form Activation & Lower Body',
      exercises: [
        { name: 'Goblet Squat', target: '3 sets × 12 reps (Focus: depth & vertical torso)' },
        { name: 'Inverted Rows', target: '3 sets × 10 reps (Focus: back activation)' },
        { name: 'Push-Ups (or Inclined)', target: '3 sets × 10 reps (Focus: control & core alignment)' },
        { name: 'Bird-Dogs Stability', target: '3 sets × 12 reps (Focus: neutral spine)' }
      ]
    },
    {
      day: 'Tuesday',
      title: 'Active Restoration & Walks',
      exercises: [
        { name: 'Low Intensity Outdoor Walk', target: '30 mins active cardiovascular stride' },
        { name: 'Full Body Mobility Stretches', target: '15 mins join-relief and chest opener stretches' }
      ]
    },
    {
      day: 'Wednesday',
      title: 'Form Activation & Upper Body Focus',
      exercises: [
        { name: 'Dumbbell Romanian Deadlift', target: '3 sets × 10 reps (Focus: hip hinging pattern)' },
        { name: 'Seated Dumbbell Overhead Press', target: '3 sets × 10 reps (Focus: vertical drive & posture)' },
        { name: 'Lat Pulldowns', target: '3 sets × 12 reps (Focus: shoulder blade pull down)' },
        { name: 'Bodyweight Glute Bridges', target: '3 sets × 15 reps (Focus: squeeze at the top)' }
      ]
    },
    {
      day: 'Thursday',
      title: 'Active Recovery & Core Stabilization',
      exercises: [
        { name: 'Low-Impact Aerobic Cardio', target: '20 mins (Stationary cycle or elliptical, Zone 2)' },
        { name: 'Plank Holds', target: '3 sets × 45s (Focus: solid abs engagement)' },
        { name: 'Thoracic Spine Openers', target: '10 mins desk posture relief stretches' }
      ]
    },
    {
      day: 'Friday',
      title: 'Full Body Stamina & Balance',
      exercises: [
        { name: 'Dumbbell Step-Ups', target: '3 sets × 10 reps each leg (Focus: single-leg strength)' },
        { name: 'Dumbbell Chest Press', target: '3 sets × 12 reps (Focus: balanced chest push)' },
        { name: 'Chest-Supported Row', target: '3 sets × 12 reps (Focus: stable chest pull)' },
        { name: 'Side-lying Clamshells', target: '3 sets × 15 reps (Focus: side glute activation)' }
      ]
    },
    {
      day: 'Saturday',
      title: 'Weekend Active Energy Cardio',
      exercises: [
        { name: 'Cardio Interval Cruise', target: '20 mins dynamic cycling or speed walking' },
        { name: 'Light Kettlebell Swings', target: '3 sets × 12 reps (Focus: hinge mechanics)' }
      ]
    },
    {
      day: 'Sunday',
      title: 'Full Rest & Mental Goal Check',
      exercises: [
        { name: 'Recovery Walk & Hydration', target: 'Plan nutrition and review next weeks exercises.' }
      ]
    }
  ],
  'Weight Loss': [
    {
      day: 'Monday',
      title: 'Metabolic Fat Burning Circuit',
      exercises: [
        { name: 'Kettlebell Swings', target: '4 sets × 25 reps (High-rep posterior power)' },
        { name: 'Bodyweight Jump Squats', target: '4 sets × 15 reps (Plyometric stamina build)' },
        { name: 'Full Chest Burpees', target: '4 sets × 12 reps (High metabolic demands)' },
        { name: 'Mountain Climbers', target: '4 sets × 30s max effort' }
      ]
    },
    {
      day: 'Tuesday',
      title: 'Cardiovascular Fat Shredder',
      exercises: [
        { name: 'Steady State Cardio Run', target: '35 mins steady pace (HR target 130-145 Zone 2)' },
        { name: 'Hanging Knee Raises', target: '3 sets × 15 reps (Lower ab sweeps)' },
        { name: 'Russian Twist Turns', target: '3 sets × 40 reps (Core shred twists)' }
      ]
    },
    {
      day: 'Wednesday',
      title: 'Active Recovery & Tissue Hydration',
      exercises: [
        { name: 'Hydration Recovery Walk', target: '45 mins low-pace rhythmic walk' },
        { name: 'Stretching & Foam Rolling', target: '20 mins deep tissue and muscular release' }
      ]
    },
    {
      day: 'Thursday',
      title: 'Upper Body HIIT Density Work',
      exercises: [
        { name: 'Dumbbell Thrusters', target: '4 sets × 15 reps (Explosive full body drive)' },
        { name: 'Battle Ropes Slashes', target: '4 sets × 45s effort (Upper body anaerobic burnout)' },
        { name: 'Responsive Push-Ups', target: '4 sets × 15 reps (Chest stamina)' },
        { name: 'Dumbbell Renegade Rows', target: '4 sets × 12 reps (Core strength & back pull)' }
      ]
    },
    {
      day: 'Friday',
      title: 'Metabolic LISS Cardio & Plank Sync',
      exercises: [
        { name: 'Rowing Machine Intervals', target: '25 mins (Alternating 40s sprint, 20s cruising)' },
        { name: 'Bicycle Crunches', target: '4 sets × 30 reps (Core shred)' },
        { name: 'Side Planks', target: '3 sets × 45s per side (Oblique resilience)' }
      ]
    },
    {
      day: 'Saturday',
      title: 'Full Body Sweating Engine',
      exercises: [
        { name: 'Kettlebell Clean & Press', target: '4 sets × 12 reps (Metabolic pull-press combo)' },
        { name: 'Plyometric Box Jumps', target: '4 sets × 12 reps (Power & calorie burn)' },
        { name: 'Burpee to Broad Jump', target: '3 sets × 10 reps (Max capacity power endurance)' }
      ]
    },
    {
      day: 'Sunday',
      title: 'Active Decompression & Fasting Reset',
      exercises: [
        { name: 'Clean Hydration & Outdoor Stride', target: 'Total physical relaxation. Reset calorie burn records.' }
      ]
    }
  ],
  'Bodybuilder': [
    {
      day: 'Monday',
      title: 'Chest & Tricep Hypertrophy',
      exercises: [
        { name: 'Incline Dumbbell Press', target: '4 sets × 12 reps (Upper chest hypertrophy)' },
        { name: 'Flat Barbell Bench Press', target: '3 sets × 10 reps (Chest thickness)' },
        { name: 'Cable Chest Flyes', target: '3 sets × 15 reps (Peak squeeze contraction)' },
        { name: 'Overhead DB Tricep Extension', target: '4 sets × 12 reps (Long head tricep)' }
      ]
    },
    {
      day: 'Tuesday',
      title: 'Back & Bicep V-Taper Pull',
      exercises: [
        { name: 'Wide-Grip Pull-Ups', target: '4 sets × 10 reps (Lat flare expansion)' },
        { name: 'One-Arm Dumbbell Row', target: '3 sets × 12 reps (Mid-back separation)' },
        { name: 'Straight-Arm Cable Pulldown', target: '3 sets × 15 reps (Isolated lat squeeze)' },
        { name: 'Incline Dumbbell Bicep Curl', target: '4 sets × 12 reps (Bicep peak pump)' }
      ]
    },
    {
      day: 'Wednesday',
      title: 'Abs Symmetry & Low-Impact Cardio',
      exercises: [
        { name: 'Decline Ab Crunches', target: '4 sets × 20 reps (Six-pack definition)' },
        { name: 'Hanging Leg Raises', target: '4 sets × 15 reps (Lower abs sweep)' },
        { name: 'Brisk Incline Walk', target: '25 mins steady aerobic fat oxidization' }
      ]
    },
    {
      day: 'Thursday',
      title: 'Leg Hypertrophy - Quad Dominant',
      exercises: [
        { name: 'Barbell Back Squat', target: '4 sets × 10 reps (Quad fatigue tempo control)' },
        { name: 'Leg Press Focus', target: '3 sets × 12 reps (Mid-range quad burn)' },
        { name: 'Single-Leg Extensions', target: '4 sets × 15 reps (Continuous tension pump)' },
        { name: 'Standing Calf Raises', target: '4 sets × 25 reps (Calf conditioning)' }
      ]
    },
    {
      day: 'Friday',
      title: 'Shoulder Flare & Arms Pump',
      exercises: [
        { name: 'Seated DB Shoulder Press', target: '4 sets × 10 reps (Deltoid caps density)' },
        { name: 'Cable Lateral Raises', target: '4 sets × 15 reps (Side delt widening)' },
        { name: 'Preacher Ez-Bar Curl', target: '3 sets × 12 reps (Bicep thickness)' },
        { name: 'Tricep Rope Pushdown', target: '3 sets × 15 reps (Horseshoe tricep lock)' }
      ]
    },
    {
      day: 'Saturday',
      title: 'Posterior Posterior Thickness',
      exercises: [
        { name: 'Stiff-Legged RDL', target: '4 sets × 12 reps (Hamstring-glute tie-in)' },
        { name: 'Chest-Supported Dumbbell Row', target: '4 sets × 10 reps (Upper back separation)' },
        { name: 'Face Pulls (Rear Delts)', target: '4 sets × 15 reps (Rotator cuff & rear cap)' }
      ]
    },
    {
      day: 'Sunday',
      title: 'Anabolic Feed & Total Rest',
      exercises: [
        { name: 'Post-Workout Synthesis Sleep', target: 'Clean high carbohydrate meals, hydration, fiber rehabilitation.' }
      ]
    }
  ],
  'Powerlifter': [
    {
      day: 'Monday',
      title: 'Heavy Back Squat Power Day',
      exercises: [
        { name: 'Barbell Back Squat', target: '5 sets × 5 reps (85% 1RM strength focus)' },
        { name: 'Bulgarian Split Squats', target: '3 sets × 8 reps per leg (Quad accessory strength)' },
        { name: 'Romanian Deadlift', target: '3 sets × 8 reps (Hamstring/posterior link)' },
        { name: 'Core Plank Support', target: '3 sets × 60s (Heavy spine bracing stability)' }
      ]
    },
    {
      day: 'Tuesday',
      title: 'Heavy Bench Press Power Day',
      exercises: [
        { name: 'Competition Bench Press', target: '5 sets × 5 reps (Retracted scapula press)' },
        { name: 'Close-Grip Bench Press', target: '3 sets × 8 reps (Tricep lockout builder)' },
        { name: 'Heavy Barbell Rows', target: '4 sets × 10 reps (Upper chest pressing pad)' },
        { name: 'Rear Delt Face Pulls', target: '3 sets × 15 reps (Shoulder stability rescue)' }
      ]
    },
    {
      day: 'Wednesday',
      title: 'Spinal Decompression & Mobility',
      exercises: [
        { name: 'Dead Hang Decompression', target: '3 sets × 45s (Spinal disk relief)' },
        { name: 'Deep Hip Opener Stretches', target: '20 mins lower body mobility flow' },
        { name: 'Stomach Vacuum Holds', target: '3 sets × 30s (Transverse abdominis support)' }
      ]
    },
    {
      day: 'Thursday',
      title: 'Heavy Conventional Deadlift Day',
      exercises: [
        { name: 'Conventional Deadlift', target: '5 sets × 3 reps (High intensity pulling speed)' },
        { name: 'Deficit Deadlifts', target: '3 sets × 5 reps (Speed development off the floor)' },
        { name: 'Lat Pulldown Rows', target: '4 sets × 10 reps (Upper back latch speed)' },
        { name: 'Heavy Farmer Shrug Walks', target: '3 sets × 50m (Grip strength & traps drive)' }
      ]
    },
    {
      day: 'Friday',
      title: 'Heavy Push-Press & Back Auxiliaries',
      exercises: [
        { name: 'Power Press-Press', target: '4 sets × 5 reps (Explosive shoulder thrust)' },
        { name: 'Unilateral Dumbbell Row', target: '3 sets × 10 reps (Lat stability)' },
        { name: 'Dumbbell Hammer Curls', target: '3 sets × 12 reps (Elbow ligament durability)' }
      ]
    },
    {
      day: 'Saturday',
      title: 'Dynamic Speed Squat & Bench Day',
      exercises: [
        { name: 'Speed Squat (50% 1RM)', target: '6 sets × 2 reps (Fast concentric drive)' },
        { name: 'Speed Bench (50% 1RM)', target: '6 sets × 3 reps (High-velocity bar acceleration)' },
        { name: 'Heavy Kettlebell Swings', target: '4 sets × 15 reps (Glutes hip hinge connection)' }
      ]
    },
    {
      day: 'Sunday',
      title: 'Neuromuscular Restoration Rest',
      exercises: [
        { name: 'Rest and Joint Care', target: 'Neuromuscular rest. Highly limited physical stress. Stretch and eat.' }
      ]
    }
  ],
  'Athletic': [
    {
      day: 'Monday',
      title: 'Triple-Extension & Explosiveness',
      exercises: [
        { name: 'Barbell Power Clean', target: '4 sets × 4 reps (Explosive triple extension hip power)' },
        { name: 'High Vertical Box Jumps', target: '4 sets × 6 reps (Dynamic fast-twitch muscle focus)' },
        { name: 'Plyometric Lateral Bounds', target: '3 sets × 12 reps (Elastic side force transition)' },
        { name: 'Overhead Med Ball Slams', target: '3 sets × 8 reps (Core speed velocity)' }
      ]
    },
    {
      day: 'Tuesday',
      title: 'Unilateral Balance & Stability',
      exercises: [
        { name: 'Single-Leg RDL Kettlebell', target: '3 sets × 10 reps per leg (Ankle & hamstring control)' },
        { name: 'Rear-Foot Elevated Split Squats', target: '3 sets × 8 reps (Sport specific quad drive)' },
        { name: 'Explosive Bodyweight Pull-Ups', target: '4 sets × 8 reps (High velocity pulling power)' },
        { name: 'Plank Shoulder Taps', target: '3 sets × 20 reps (Anti-rotational stability)' }
      ]
    },
    {
      day: 'Wednesday',
      title: 'Joint Elasticity & Tendon Resilience',
      exercises: [
        { name: 'Patellar Tendon Isometric Holds', target: '3 sets × 30s single-leg holds at 60deg' },
        { name: 'Ankle Elastic Hops', target: '3 sets × 50 reps (Tendon elastic stiffness bounce)' },
        { name: 'Deep Hip Mobility Flow', target: '20 mins rotational joint relaxation' }
      ]
    },
    {
      day: 'Thursday',
      title: 'Agility, Speed & Acceleration',
      exercises: [
        { name: 'Sprint Starts (10-30m)', target: '6 reps (Maximum acceleration drive phase)' },
        { name: 'Pro Agility Cone Shuttle 5-10-5', target: '4 reps each side (Lateral change-of-direction speed)' },
        { name: 'Medicine Ball Chest Pass Slam', target: '4 sets × 10 reps (Vertical-to-horizontal force transfer)' }
      ]
    },
    {
      day: 'Friday',
      title: 'Rotational Power & Velocity Press',
      exercises: [
        { name: 'Dynamic Cable Woodchops', target: '3 sets × 12 reps (Rotational torque transfer)' },
        { name: 'Dumbbell Push Press', target: '4 sets × 5 reps (Overhead kinetic chain power)' },
        { name: 'Incline Dumbbell Fly Rows', target: '3 sets × 10 reps (Lat stability grip combo)' }
      ]
    },
    {
      day: 'Saturday',
      title: 'Metabolic Conditioning Engine',
      exercises: [
        { name: 'Assault Bike Sprint Intervals', target: '20 mins (20s sprint max effort / 40s resting pace)' },
        { name: 'Kettlebell Snatch Lift', target: '4 sets × 12 reps (Glute-shoulder endurance)' }
      ]
    },
    {
      day: 'Sunday',
      title: 'Decompression & Athletic Restoration',
      exercises: [
        { name: 'Foam Rolling & Walk', target: 'Deep tissue compression, active walking, joint relief hydration.' }
      ]
    }
  ]
};

export const WEEKLY_PROGRAM: WorkoutDay[] = WEEKLY_PROGRAMS['Bodybuilder'];

export const INITIAL_PROFILE: UserProfile = {
  name: 'Fitness Warrior',
  level: 7,
  xp: 1360,
  xpNext: 2000,
  workoutsCompleted: 34,
  streak: 21,
  weightProgress: '-8kg Overall',
  fitnessGoal: 'Bodybuilder',
  settings: {
    restTimerAlerts: true,
    videoTutorials: true,
    aiCoachReminders: true,
    weeklyCheckIn: false
  }
};
