<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submission</title>
    <style>
        body { font-family: monospace; background-color: #f3f4f6; color: #1f2937; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background-color: #4c1d95; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        h1 { margin: 0; font-size: 24px; }
        p { margin: 10px 0; }
        strong { color: #4c1d95; }
        pre { white-space: pre-wrap; word-wrap: break-word; background-color: #f3f4f6; padding: 10px; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Project Inquiry</h1>
        </div>
        <div class="content">
            <p><strong>Name:</strong> <pre>{{ $data['name'] }}</pre></p>
            <p><strong>Email:</strong> <a href="mailto:{{ $data['email'] }}" style="color: #4c1d95;">{{ $data['email'] }}</a></p>
            @if(isset($data['phone']) && !empty($data['phone']))
                <p><strong>Phone:</strong> <a href="tel:{{ $data['phone'] }}" style="color: #4c1d95;">{{ $data['phone'] }}</a></p>
            @endif
            <p><strong>Project Name:</strong> <pre>{{ $data['projectName'] }}</pre></p>
            <p><strong>Project Description:</strong> <pre>{{ $data['projectDescription'] }}</pre></p>
            @if(isset($data['targetAudience']))
                <p><strong>Target Audience:</strong> <pre>{{ $data['targetAudience'] }}</pre></p>
            @endif
            @if(isset($data['desiredFeatures']))
                <p><strong>Desired Features:</strong> <pre>{{ $data['desiredFeatures'] }}</pre></p>
            @endif
            @if(isset($data['budget']))
                <p><strong>Budget:</strong> <pre>{{ $data['budget'] }}</pre></p>
            @endif
            @if(isset($data['timeline']))
                <p><strong>Timeline:</strong> <pre>{{ $data['timeline'] }}</pre></p>
            @endif
            <p><strong>Has Existing Website:</strong> {{ $data['hasExistingWebsite'] ? 'Yes' : 'No' }}</p>
            @if($data['hasExistingWebsite'] && isset($data['existingWebsiteLink']))
                <p><strong>Existing Website Link:</strong> <a href="{{ $data['existingWebsiteLink'] }}" style="color: #4c1d95;">{{ $data['existingWebsiteLink'] }}</a></p>
            @endif
            <p><strong>Needs Internationalization:</strong> {{ $data['needsInternationalization'] ? 'Yes' : 'No' }}</p>
        </div>
    </div>
</body>
</html>
