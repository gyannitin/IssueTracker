package com.IssueTracker.resources;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
public enum  IssuesDao {
	instance;
private Map<String,IssueDetails> issueDetails = new HashMap<String, IssueDetails>();
 
private IssuesDao(){
	

	 Gson gson = new Gson();

     try (Reader reader = new FileReader("C:/Users/MuthuSS/Documents/Workspace/IssueTracker/data.json")) {

			// Convert JSON to Java Object
         IssueDetails[] issueDetail = gson.fromJson(reader, IssueDetails[].class);
        for (int i=0;i<issueDetail.length;i++)
        {
        	issueDetails.put(Integer.toString(i),issueDetail[i]);
        }

     } catch (IOException e) {
         e.printStackTrace();
     }

 }
		
public String addIssue(Map<String,IssueDetails> issDetails )
{
	
	Gson gson = new Gson();
    String json = gson.toJson(issDetails);
  

    //2. Convert object to JSON string and save into a file directly
    try (FileWriter writer = new FileWriter("C:/Users/MuthuSS/Documents/Workspace/IssueTracker/data.json")) {

        gson.toJson(issDetails, writer);

    } catch (IOException e) {
        e.printStackTrace();
    }

	return "done";
}

public Map<String, IssueDetails> getIssues() {
	return issueDetails;
}
}
