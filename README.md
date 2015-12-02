#Docs#



##User##
###Login###
  [GET] /auth/facebook?fb_token={FACEBOOK_ACCESS_TOKEN}

###Details###
  [GET] /user?access_token={ACCESS_TOKEN}

###Medicines###
  [GET] /user/medicines?access_token={ACCESS_TOKEN}

  //This will create a medicine and associate with a user
  [POST] /user/medicines?name={NAME}&picture={PICTURE_URL}&access_token={ACCESS_TOKEN}

  //This will associate an existent medicine with a user
  [POST] /user/medicines?medicineId={NAME}&access_token={ACCESS_TOKEN}


##Prescriptions##
###List###
  [GET] /user/prescriptions?access_token={ACCESS_TOKEN}
  [POST] /user/prescriptions?userMedicineId={MEDICINE_ID}&weekDay={WEEK_DAY}&dayTime={DAY_TIME}&repeatUntil={REPEAT_UNTIL_DATE}&access_token={ACCESS_TOKEN}


##Medicines##
###List###
  [GET] /medicines

  //This will create a medicine but not associate with any user
  [POST] /medicines?name={NAME}&picture={PICTURE_URL}
